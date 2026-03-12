//This code was run in the Google Earth Engine (GEE) code editor
//Here is a link to the code in GEE https://code.earthengine.google.com/29d3049039f3acf51487b4dee2c0e627 

// Defining adminstrative areas reported in household surveys
// Define island groups for Kiribati
var noGil = 
    ee.Geometry.Polygon(
        [[[173.76214858993802, 1.688437284048748],
          [173.89398452743802, 3.2689380495714633],
          [172.53167983993802, 4.277476168442425],
          [172.05246629783107, 3.029716351603881],
          [172.84548591405644, 1.4656846206052414],
          [173.12175664737128, 1.3820186787491144],
          [173.1354466421833, 1.3865663776048271],
          [173.14021024539375, 1.3954043333854713]]]),
    souTara = 
    ee.Geometry.Polygon(
        [[[173.14024407183683, 1.3954382342837202],
          [173.13552338397062, 1.3865573758520389],
          [173.12591034686125, 1.382867734037598],
          [172.9929535267801, 1.3664672516799288],
          [172.8940765736551, 1.3946115454160364],
          [172.8940765736551, 1.317042332174653],
          [173.04582523088166, 1.304685947700206],
          [173.21679996232697, 1.3609756435068756],
          [173.17560123185822, 1.406967470897869]]]),
    cenGil = 
    ee.Geometry.Polygon(
        [[[172.75257236267254, 1.106559466163889],
          [172.75257236267254, -0.947771870448704],
          [174.70813876892254, -0.947771870448704],
          [174.70813876892254, 1.106559466163889]]], null, false),
    souGil = 
    ee.Geometry.Polygon(
        [[[174.44446689392254, -1.0356493216635867],
          [174.44446689392254, -2.858249945133194],
          [177.15808994079754, -2.858249945133194],
          [177.15808994079754, -1.0356493216635867]]], null, false),
    lineAndPhoenix = 
    ee.Geometry.Polygon(
        [[[178.7565749612447, 8.140225397293124],
          [178.7565749612447, -20.88502241263751],
          [223.75657496124472, -20.88502241263751],
          [223.75657496124472, 8.140225397293124]]], null, false);

// Define the countries to sample from level 0, 2, 3 or 1
var countryLevel0 = ['Kiribati','Tonga'];
var countryLevel1 = ['Gambia','Iraq','Togo',  'Chad','Georgia','Ghana','Guinea-Bissau','Guyana','Laos','Lesotho','Nigeria','Paraguay','Sierra Leone','Suriname','Tonga','Zimbabwe'];
var countryLevel2 = ['Bangladesh','Gambia','Iraq','Kosovo','Madagascar','Palestina','Togo', 'São Tomé and Príncipe'];
var countryLevel3 = 'Pakistan';

// Load the GADM datasets 
var GADM_level0 = ee.FeatureCollection('users/crowtherlab/GADM36/GADM36_level0')
                    .filter(ee.Filter.inList('NAME_0',['Kiribati']));

var GADM_level1_prep = ee.FeatureCollection('users/crowtherlab/GADM36/GADM36_level1');

var GADM_level1 = GADM_level1_prep.filter(ee.Filter.inList('NAME_0',countryLevel1))
                                  .map(function(f){return f.set('HH7',f.getString('NAME_1'))});

var GADM_level2_prep = ee.FeatureCollection('users/crowtherlab/GADM36/GADM36_level2');
var GADM_level2 = GADM_level2_prep.filter(ee.Filter.inList('NAME_0',countryLevel2))
                                  .map(function(f){return f.set('HH7',f.getString('NAME_2'))});
                    
var GADM_level3_prep = ee.FeatureCollection('users/crowtherlab/GADM36/GADM36_level3');
var GADM_level3 = GADM_level3_prep
                    .filterMetadata('NAME_0','equals',countryLevel3)
                    .map(function(f){return f.set('HH7',f.getString('NAME_3'))});

// Define Kiribati 
var NORTHERN_GILBERT = ee.Feature(GADM_level0.geometry().intersection(noGil, 10)).set('NAME_1','NORTHERN GILBERT').set('NAME_0','Kiribati').set('HH7','NORTHERN_GILBERT');
var SOUTH_TARAWA = ee.Feature(GADM_level0.geometry().intersection(souTara, 10)).set('NAME_1','SOUTH TARAWA').set('NAME_0','Kiribati').set('HH7','SOUTH_TARAWA');
var CENTRAL_GILBERT = ee.Feature(GADM_level0.geometry().intersection(cenGil, 10)).set('NAME_1','CENTRAL GILBERT').set('NAME_0','Kiribati').set('HH7','CENTRAL_GILBERT');
var SOUTHERN_GILBERT = ee.Feature(GADM_level0.geometry().intersection(souGil, 10)).set('NAME_1','SOUTHERN GILBERT').set('NAME_0','Kiribati').set('HH7','SOUTHERN_GILBERT');
var LINE_AND_PHOENIX = ee.Feature(GADM_level0.geometry().intersection(lineAndPhoenix, 10)).set('NAME_1','LINE AND PHOENIX GROUP').set('NAME_0','Kiribati').set('HH7','LINE_AND_PHOENIX');
var GADM_level0 = ee.FeatureCollection([NORTHERN_GILBERT, SOUTH_TARAWA, CENTRAL_GILBERT, SOUTHERN_GILBERT, LINE_AND_PHOENIX]);

///// Define the new regions for Level 1
// Algeria 
var NORD_CENTRE = ['Alger','Blida','Boumerdès','Tipaza','Bouira','Médéa','Tizi Ouzou','Béjaïa','Chlef','Aïn Defla'];
var NORD_EST = ['Annaba','Constantine','Skikda','Jijel','Mila','Souk Ahras','El Tarf','Guelma'];
var NORD_OUEST = ['Oran','Tlemcen','Mostaganem','Aïn Témouchent','Relizane','Sidi Bel Abbès','Mascara'];
var HAUT_PLATEAU_CENTRE = ['Djelfa','Laghouat',"M'Sila"];
var HAUT_PLATEAU_EST = ['Sétif','Batna','Khenchela','Bordj Bou Arréridj','Oum el Bouaghi','Tébessa'];
var HAUT_PLATEAU_OUEST = ['Saïda','Tissemsilt','Naâma','El Bayadh','Tiaret'];
var SUD = ['Béchar','Tindouf','Adrar','Ghardaïa','Biskra','El Oued','Ouargla','Tamanghasset','Illizi'];

// Central African Republic 
var REGION_1 = ["Ombella-M'Poko","Lobaye"];
var REGION_2 = ["Mambéré-Kadéï","Nana-Mambéré","Sangha-Mbaéré"];
var REGION_3 = ["Ouham-Pendé","Ouham"];
var REGION_4 = ["Kémo","Nana-Grébizi","Ouaka"];
var REGION_5 = ["Bamingui-Bangoran","Haute-Kotto","Vakaga"];
var REGION_6 = ["Basse-Kotto","Mbomou","Haut-Mbomou"];
var REGION_7 = ["Bangui"];

// Mongolia
var WESTERN = ["Bayan-Ölgiy","Govi-Altay","Dzavhan","Hovd","Uvs"];
var EASTERN = ["Dornod","Sühbaatar","Hentiy"];
var ULAANBAATAR = ["Ulaanbaatar"];
var CENTRAL = ["Töv","Ömnögovi","Selenge","Orhon","Darhan-Uul","Govisümber","Dundgovi","Dornogovi"];
var KHANGAI = ["Bayanhongor","Hövsgöl","Arhangay","Övörhangay","Bulgan"];

// Tunisia
var TUNISIA_District_Tunis = ["Ariana","Ben Arous (Tunis Sud)","Bizerte","Manubah","Nabeul","Tunis","Zaghouan"];
var TUNISIA_NORD_OUEST = ["Béja","Jendouba","Le Kef","Siliana"];
var TUNISIA_CENTRE_EST = ["Mahdia","Monastir","Sousse"];
var TUNISIA_CENTRE_OUEST = ["Kairouan","Kassérine","Sidi Bou Zid"];
var TUNISIA_SUD_EST = ["Gabès","Médenine","Sfax","Tataouine"];
var TUNISIA_SUD_OUEST = ["Gafsa","Kebili","Tozeur"];

// Concatenate the districts into regions
var NORD_CENTRE = GADM_level1_prep.filterMetadata('NAME_0','equals','Algeria').filter(ee.Filter.inList("NAME_1",NORD_CENTRE));
var NORD_EST = GADM_level1_prep.filterMetadata('NAME_0','equals','Algeria').filter(ee.Filter.inList("NAME_1",NORD_EST));
var NORD_OUEST = GADM_level1_prep.filterMetadata('NAME_0','equals','Algeria').filter(ee.Filter.inList("NAME_1",NORD_OUEST));
var HAUT_PLATEAU_CENTRE = GADM_level1_prep.filterMetadata('NAME_0','equals','Algeria').filter(ee.Filter.inList("NAME_1",HAUT_PLATEAU_CENTRE));
var HAUT_PLATEAU_EST = GADM_level1_prep.filterMetadata('NAME_0','equals','Algeria').filter(ee.Filter.inList("NAME_1",HAUT_PLATEAU_EST));
var HAUT_PLATEAU_OUEST = GADM_level1_prep.filterMetadata('NAME_0','equals','Algeria').filter(ee.Filter.inList("NAME_1",HAUT_PLATEAU_OUEST));
var SUD = GADM_level1_prep.filterMetadata('NAME_0','equals','Algeria').filter(ee.Filter.inList("NAME_1",SUD));

var REGION_1 = GADM_level1_prep.filterMetadata('NAME_0','equals','Central African Republic').filter(ee.Filter.inList("NAME_1",REGION_1));
var REGION_2 = GADM_level1_prep.filterMetadata('NAME_0','equals','Central African Republic').filter(ee.Filter.inList("NAME_1",REGION_2));
var REGION_3 = GADM_level1_prep.filterMetadata('NAME_0','equals','Central African Republic').filter(ee.Filter.inList("NAME_1",REGION_3));
var REGION_4 = GADM_level1_prep.filterMetadata('NAME_0','equals','Central African Republic').filter(ee.Filter.inList("NAME_1",REGION_4));
var REGION_5 = GADM_level1_prep.filterMetadata('NAME_0','equals','Central African Republic').filter(ee.Filter.inList("NAME_1",REGION_5));
var REGION_6 = GADM_level1_prep.filterMetadata('NAME_0','equals','Central African Republic').filter(ee.Filter.inList("NAME_1",REGION_6));
var REGION_7 = GADM_level1_prep.filterMetadata('NAME_0','equals','Central African Republic').filter(ee.Filter.inList("NAME_1",REGION_7));

var WESTERN = GADM_level1_prep.filterMetadata('NAME_0','equals','Mongolia').filter(ee.Filter.inList("NAME_1",WESTERN));
var EASTERN = GADM_level1_prep.filterMetadata('NAME_0','equals','Mongolia').filter(ee.Filter.inList("NAME_1",EASTERN));
var ULAANBAATAR = GADM_level1_prep.filterMetadata('NAME_0','equals','Mongolia').filter(ee.Filter.inList("NAME_1",ULAANBAATAR));
var CENTRAL = GADM_level1_prep.filterMetadata('NAME_0','equals','Mongolia').filter(ee.Filter.inList("NAME_1",CENTRAL));
var KHANGAI = GADM_level1_prep.filterMetadata('NAME_0','equals','Mongolia').filter(ee.Filter.inList("NAME_1",KHANGAI));
           
var TUNISIA_District_Tunis = GADM_level1_prep.filterMetadata('NAME_0','equals','Tunisia').filter(ee.Filter.inList("NAME_1",TUNISIA_District_Tunis));
var TUNISIA_NORD_OUEST = GADM_level1_prep.filterMetadata('NAME_0','equals','Tunisia').filter(ee.Filter.inList("NAME_1",TUNISIA_NORD_OUEST));
var TUNISIA_CENTRE_EST = GADM_level1_prep.filterMetadata('NAME_0','equals','Tunisia').filter(ee.Filter.inList("NAME_1",TUNISIA_CENTRE_EST));
var TUNISIA_CENTRE_OUEST = GADM_level1_prep.filterMetadata('NAME_0','equals','Tunisia').filter(ee.Filter.inList("NAME_1",TUNISIA_CENTRE_OUEST));
var TUNISIA_SUD_EST = GADM_level1_prep.filterMetadata('NAME_0','equals','Tunisia').filter(ee.Filter.inList("NAME_1",TUNISIA_SUD_EST));
var TUNISIA_SUD_OUEST = GADM_level1_prep.filterMetadata('NAME_0','equals','Tunisia').filter(ee.Filter.inList("NAME_1",TUNISIA_SUD_OUEST));
                          
// Final FCs
var Algeria = ee.FeatureCollection([
    ee.Feature(NORD_CENTRE.union().geometry()).set('NAME_0','Algeria').set('NAME_1','NORD CENTRE').set('NAME_1s',NORD_CENTRE.aggregate_array('NAME_1').join('|')).set('GID_1s',NORD_CENTRE.aggregate_array('GID_1').join('|')).set('HH7','NORD_CENTRE'),
    ee.Feature(NORD_EST.union().geometry()).set('NAME_0','Algeria').set('NAME_1','NORD EST').set('NAME_1s',NORD_EST.aggregate_array('NAME_1').join('|')).set('GID_1s',NORD_EST.aggregate_array('GID_1').join('|')).set('HH7','NORD_EST'),
    ee.Feature(NORD_OUEST.union().geometry()).set('NAME_0','Algeria').set('NAME_1','NORD OUEST').set('NAME_1s',NORD_OUEST.aggregate_array('NAME_1').join('|')).set('GID_1s',NORD_OUEST.aggregate_array('GID_1').join('|')).set('HH7','NORD_OUEST'),
    ee.Feature(HAUT_PLATEAU_CENTRE.union().geometry()).set('NAME_0','Algeria').set('NAME_1','HAUT PLATEAU CENTRE').set('NAME_1s',HAUT_PLATEAU_CENTRE.aggregate_array('NAME_1').join('|')).set('GID_1s',HAUT_PLATEAU_CENTRE.aggregate_array('GID_1').join('|')).set('HH7','HAUT_PLATEAU_CENTRE'),
    ee.Feature(HAUT_PLATEAU_EST.union().geometry()).set('NAME_0','Algeria').set('NAME_1','HAUT PLATEAU EST').set('NAME_1s',HAUT_PLATEAU_EST.aggregate_array('NAME_1').join('|')).set('GID_1s',HAUT_PLATEAU_EST.aggregate_array('GID_1').join('|')).set('HH7','HAUT_PLATEAU_EST'),
    ee.Feature(HAUT_PLATEAU_OUEST.union().geometry()).set('NAME_0','Algeria').set('NAME_1','HAUT PLATEAU OUEST').set('NAME_1s',HAUT_PLATEAU_OUEST.aggregate_array('NAME_1').join('|')).set('GID_1s',HAUT_PLATEAU_OUEST.aggregate_array('GID_1').join('|')).set('HH7','HAUT_PLATEAU_OUEST'),
    ee.Feature(SUD.union().geometry()).set('NAME_0','Algeria').set('NAME_1','SUD').set('NAME_1s',SUD.aggregate_array('NAME_1').join('|')).set('GID_1s',SUD.aggregate_array('GID_1').join('|')).set('HH7','SUD'),
    ]);
var CAR = ee.FeatureCollection([
    ee.Feature(REGION_1.union().geometry()).set('NAME_0','Central African Republic').set('NAME_1','REGION_1').set('NAME_1s',REGION_1.aggregate_array('NAME_1').join('|')).set('GID_1s',REGION_1.aggregate_array('GID_1').join('|')).set("HH7","REGION_1"),
    ee.Feature(REGION_2.union().geometry()).set('NAME_0','Central African Republic').set('NAME_1','REGION_2').set('NAME_1s',REGION_2.aggregate_array('NAME_1').join('|')).set('GID_1s',REGION_2.aggregate_array('GID_1').join('|')).set("HH7","REGION_2"),
    ee.Feature(REGION_3.union().geometry()).set('NAME_0','Central African Republic').set('NAME_1','REGION_3').set('NAME_1s',REGION_3.aggregate_array('NAME_1').join('|')).set('GID_1s',REGION_3.aggregate_array('GID_1').join('|')).set("HH7","REGION_3"),
    ee.Feature(REGION_4.union().geometry()).set('NAME_0','Central African Republic').set('NAME_1','REGION_4').set('NAME_1s',REGION_4.aggregate_array('NAME_1').join('|')).set('GID_1s',REGION_4.aggregate_array('GID_1').join('|')).set("HH7","REGION_4"),
    ee.Feature(REGION_5.union().geometry()).set('NAME_0','Central African Republic').set('NAME_1','REGION_5').set('NAME_1s',REGION_5.aggregate_array('NAME_1').join('|')).set('GID_1s',REGION_5.aggregate_array('GID_1').join('|')).set("HH7","REGION_5"),
    ee.Feature(REGION_6.union().geometry()).set('NAME_0','Central African Republic').set('NAME_1','REGION_6').set('NAME_1s',REGION_6.aggregate_array('NAME_1').join('|')).set('GID_1s',REGION_6.aggregate_array('GID_1').join('|')).set("HH7","REGION_6"),
    ee.Feature(REGION_7.union().geometry()).set('NAME_0','Central African Republic').set('NAME_1','REGION_7').set('NAME_1s',REGION_7.aggregate_array('NAME_1').join('|')).set('GID_1s',REGION_7.aggregate_array('GID_1').join('|')).set("HH7","REGION_7")
    ]);
var Mongolia = ee.FeatureCollection([
    ee.Feature(WESTERN.union().geometry()).set('NAME_0','Mongolia').set('NAME_1','WESTERN').set('NAME_1s',WESTERN.aggregate_array('NAME_1').join('|')).set('GID_1s',WESTERN.aggregate_array('GID_1').join('|')).set('HH7','WESTERN'),
    ee.Feature(EASTERN.union().geometry()).set('NAME_0','Mongolia').set('NAME_1','EASTERN').set('NAME_1s',EASTERN.aggregate_array('NAME_1').join('|')).set('GID_1s',EASTERN.aggregate_array('GID_1').join('|')).set('HH7','EASTERN'),
    ee.Feature(ULAANBAATAR.union().geometry()).set('NAME_0','Mongolia').set('NAME_1','ULAANBAATAR').set('NAME_1s',ULAANBAATAR.aggregate_array('NAME_1').join('|')).set('GID_1s',ULAANBAATAR.aggregate_array('GID_1').join('|')).set('HH7','ULAANBAATAR'),
    ee.Feature(CENTRAL.union().geometry()).set('NAME_0','Mongolia').set('NAME_1','CENTRAL').set('NAME_1s',CENTRAL.aggregate_array('NAME_1').join('|')).set('GID_1s',CENTRAL.aggregate_array('GID_1').join('|')).set('HH7','CENTRAL'),
    ee.Feature(KHANGAI.union().geometry()).set('NAME_0','Mongolia').set('NAME_1','KHANGAI').set('NAME_1s',KHANGAI.aggregate_array('NAME_1').join('|')).set('GID_1s',KHANGAI.aggregate_array('GID_1').join('|')).set('HH7','KHANGAI')
    ]);
var Tunisia = ee.FeatureCollection([
    ee.Feature(TUNISIA_District_Tunis.union().geometry()).set('NAME_0','Tunisia').set('NAME_1','TUNISIA_District_Tunis').set('NAME_1s',TUNISIA_District_Tunis.aggregate_array('NAME_1').join('|')).set('GID_1s',TUNISIA_District_Tunis.aggregate_array('GID_1').join('|')).set('HH7','TUNISIA_District_Tunis'),
    ee.Feature(TUNISIA_NORD_OUEST.union().geometry()).set('NAME_0','Tunisia').set('NAME_1','TUNISIA_NORD_OUEST').set('NAME_1s',TUNISIA_NORD_OUEST.aggregate_array('NAME_1').join('|')).set('GID_1s',TUNISIA_NORD_OUEST.aggregate_array('GID_1').join('|')).set('HH7','TUNISIA_NORD_OUEST'),
    ee.Feature(TUNISIA_CENTRE_EST.union().geometry()).set('NAME_0','Tunisia').set('NAME_1','TUNISIA_CENTRE_EST').set('NAME_1s',TUNISIA_CENTRE_EST.aggregate_array('NAME_1').join('|')).set('GID_1s',TUNISIA_CENTRE_EST.aggregate_array('GID_1').join('|')).set('HH7','TUNISIA_CENTRE_EST'),
    ee.Feature(TUNISIA_CENTRE_OUEST.union().geometry()).set('NAME_0','Tunisia').set('NAME_1','TUNISIA_CENTRE_OUEST').set('NAME_1s',TUNISIA_CENTRE_OUEST.aggregate_array('NAME_1').join('|')).set('GID_1s',TUNISIA_CENTRE_OUEST.aggregate_array('GID_1').join('|')).set('HH7','TUNISIA_CENTRE_OUEST'),
    ee.Feature(TUNISIA_SUD_EST.union().geometry()).set('NAME_0','Tunisia').set('NAME_1','TUNISIA_SUD_EST').set('NAME_1s',TUNISIA_SUD_EST.aggregate_array('NAME_1').join('|')).set('GID_1s',TUNISIA_SUD_EST.aggregate_array('GID_1').join('|')).set('HH7','TUNISIA_SUD_EST'),
    ee.Feature(TUNISIA_SUD_OUEST.union().geometry()).set('NAME_0','Tunisia').set('NAME_1','TUNISIA_SUD_OUEST').set('NAME_1s',TUNISIA_SUD_OUEST.aggregate_array('NAME_1').join('|')).set('GID_1s',TUNISIA_SUD_OUEST.aggregate_array('GID_1').join('|')).set('HH7','TUNISIA_SUD_OUEST')
    ]);    
var GADM_level1 = GADM_level1.merge(Algeria).merge(CAR).merge(Tunisia).merge(Mongolia);

// Add the missing properties 
var GADM_level3 = GADM_level3.map(function(f){return f.set('NAME_1s', 'NaN').set('GID_1s', 'NaN')});
var GADM_level0 = GADM_level0.map(function(f){var p = GADM_level3.first().propertyNames().removeAll(GADM_level0.first().propertyNames()); 
                                              return f.set(ee.Dictionary.fromLists(p,ee.List.repeat('NaN',p.size())))});
var GADM_level2 = GADM_level2.map(function(f){var p = GADM_level3.first().propertyNames().removeAll(GADM_level2.first().propertyNames()); 
                                              return f.set(ee.Dictionary.fromLists(p,ee.List.repeat('NaN',p.size())))});
var GADM_level1 = GADM_level1.map(function(f){var p = GADM_level3.first().propertyNames().removeAll(GADM_level1.first().propertyNames()); 
                                              return f.set(ee.Dictionary.fromLists(p,ee.List.repeat('NaN',p.size())))});                                              
KHANGAI

// Merge the data 
var GADM_toSample = GADM_level2.merge(GADM_level0).merge(GADM_level3).merge(GADM_level1);
// print(GADM_toSample)

///// Define the new regions for Level 3
var Pakistan_Gujranwala = ee.FeatureCollection(ee.Feature(GADM_level3_prep.filterMetadata('NAME_3','contains','Gujranwala').geometry())
                              .set('NAME_0','Pakistan')
                              .set('NAME_3','Gujranwala')
                              .set('HH7','Gujranwala'))
                              .map(function(f){var p = GADM_level3_prep.first().propertyNames().removeAll(['NAME_0','NAME_3']); 
                                              return f.set(ee.Dictionary.fromLists(p,ee.List.repeat('NaN',p.size())))});                  
var REGIAO_NORTE_OESTE = ee.FeatureCollection(ee.Feature(GADM_level2_prep.filterMetadata('NAME_0','contains','São Tomé and Príncipe')
                            .filter(ee.Filter.inList('NAME_2',['Lembá','Lobata'])).geometry())
                            .set('NAME_0','São Tomé and Príncipe')
                            .set('NAME_2','REGIÃO NORTE OESTE')
                            .set('HH7','REGIAO_NORTE_OESTE'))
                            .map(function(f){var p = GADM_level3_prep.first().propertyNames().removeAll(['NAME_0','NAME_2']); 
                                              return f.set(ee.Dictionary.fromLists(p,ee.List.repeat('NaN',p.size())))});                  
var REGIAO_SUL_ESTE = ee.FeatureCollection(ee.Feature(GADM_level2_prep.filterMetadata('NAME_0','contains','São Tomé and Príncipe')
                            .filter(ee.Filter.inList('NAME_2',['Cantagalo','Caué'])).geometry())
                            .set('NAME_0','São Tomé and Príncipe')
                            .set('NAME_2','REGIÃO SUL ESTE')
                            .set('HH7','REGIAO_SUL_ESTE'))
                            .map(function(f){var p = GADM_level3_prep.first().propertyNames().removeAll(['NAME_0','NAME_2']); 
                                              return f.set(ee.Dictionary.fromLists(p,ee.List.repeat('NaN',p.size())))});
var Principe = ee.FeatureCollection(ee.Feature(GADM_level1_prep.filterMetadata('NAME_0','contains','São Tomé and Príncipe')
                            .filter(ee.Filter.inList('NAME_1',['Príncipe'])).geometry())
                            .set('NAME_0','São Tomé and Príncipe')
                            .set('NAME_1','Príncipe')
                            .set('HH7','Príncipe'))
                            .map(function(f){var p = GADM_level3_prep.first().propertyNames().removeAll(['NAME_0','NAME_1']); 
                                              return f.set(ee.Dictionary.fromLists(p,ee.List.repeat('NaN',p.size())))});

// Add them to the to sampling data 
var GADM_toSample = GADM_toSample.merge(Pakistan_Gujranwala).merge(REGIAO_NORTE_OESTE).merge(REGIAO_SUL_ESTE).merge(Principe);

Export.table.toAsset(GADM_toSample, 'GADM_regionsOI', 'projects/crowtherlab/t3/WaterQualityAndDiarrhea/GADM_regionsOI')

var GADM_toSample = ee.FeatureCollection('projects/crowtherlab/t3/WaterQualityAndDiarrhea/GADM_regionsOI')

//Map.addLayer(GADM_toSample)


// Mapping Climate Zones for subgroup analysis
var coloured = {
  bands: ['b1'],
  min: 0,
  max: 30,
  palette: ['blue', 'blue','blue','blue', //tropical
  'red','red','red','red',// arid
  'yellow', 'yellow','yellow', 'yellow','yellow', 'yellow','yellow', 'yellow','yellow',//temperate
  'turquoise','turquoise','turquoise','turquoise','turquoise','turquoise','turquoise','turquoise','turquoise','turquoise','turquoise','turquoise',//cold
  'white', 'white']
};
Map.addLayer(KoppenGeigerClimateZones, coloured, 'coloured')

Map.addLayer(GADM_toSample)

var climateZones_GADM = ee.Image.cat([KoppenGeigerClimateZones, GADM_toSample])

// get PNG thumbnail of climate zones
var thumbnail_ClimateZones = KoppenGeigerClimateZones.getThumbURL({
  'min': 0,
  'max': 30,
  'palette': ['blue', 'blue','blue','blue', //tropical
  'red','red','red','red',// arid
  'yellow', 'yellow','yellow', 'yellow','yellow', 'yellow','yellow', 'yellow','yellow',//temperate
  'turquoise','turquoise','turquoise','turquoise','turquoise','turquoise','turquoise','turquoise','turquoise','turquoise','turquoise','turquoise',//cold
  'white', 'white'],
  'dimensions': 500,
  'crs': 'EPSG:3857'
});
print('ClimateZones', thumbnail_ClimateZones);



// Load the data and remove the empty ones from Paraguay
var df = ee.FeatureCollection('projects/crowtherlab/t3/WaterQualityAndDiarrhea/MICS_SMDW')
            .filter(ee.Filter.eq('HH7','').not());

// Check which HH7 is not in GADM_toSample
var hh7s = GADM_toSample.aggregate_array('HH7').distinct().sort();
// print(df.filter(ee.Filter.inList('HH7',hh7s).not()).aggregate_array('HH7').distinct().sort())


print(df.aggregate_array('HH5D').distinct().sort())

// Define the bands of interest 
var bands = ['skin_temperature',
               'runoff_max',
               'runoff_min',
               'total_precipitation_max',
               'total_precipitation_min'];


var addSuffix = function(bandNames, suffix) {
  return bandNames.map(function(bandName){return ee.String(bandName).cat(suffix)});
};


var sampleDataERA = function(feature){
  // Get the date of sampling; if needed, add an earlier date (e.g. one month earlier)
  var yearOfSampling = feature.getNumber('HH5Y');
  var monthOfSampling = feature.getNumber('HH5M');
  var dayOfSampling = feature.getNumber('HH5D');
  var dateOfSampling = ee.Date.fromYMD(yearOfSampling, monthOfSampling, dayOfSampling);
  var datePriorYear = dateOfSampling.advance(-365,'days');
  var datePrior30 = dateOfSampling.advance(-30,'days');
  var datePrior14 = dateOfSampling.advance(-14,'days');
  
  // !! Make a composite image of the images for ERA5_Land
  var bands = ['skin_temperature',
              'temperature_2m',
              'runoff_sum',
              'total_precipitation_sum'
              ];
  var ERA = ee.ImageCollection("ECMWF/ERA5_LAND/DAILY_AGGR").select(bands);
  var proj = ERA.first().projection().getInfo();
  var prior30 = ERA.filterDate(datePrior30, dateOfSampling.advance(1, 'day')).mean().rename(addSuffix(bands, '_30daysPrior'));
  var prior14 = ERA.filterDate(datePrior14, dateOfSampling.advance(1, 'day')).mean().rename(addSuffix(bands, '_14daysPrior'));
  var imageToSample = ee.Image.cat([prior30,prior14]);
    
  // Get the geometry of the feature
  var hh7 = feature.getString('HH7');
  var geo = GADM_toSample.filter(ee.Filter.eq('HH7',hh7));
    
  // Sample the image
  var reducers = ee.Reducer.mean().setOutputs([bands[0] + '_30daysPrior'])
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_14daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[1] + '_30daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[1] + '_14daysPrior']))
        .combine(ee.Reducer.sum().setOutputs([bands[2] + '_30daysPrior']))
        .combine(ee.Reducer.sum().setOutputs([bands[2] + '_14daysPrior']))
        .combine(ee.Reducer.sum().setOutputs([bands[3] + '_30daysPrior']))
        .combine(ee.Reducer.sum().setOutputs([bands[3] + '_14daysPrior']));
  var sampleDict = imageToSample.reduceRegion({
                        reducer: reducers, 
                        geometry: geo.geometry(), 
                        // scale: 2000, 
                        crs: proj.crs, 
                        crsTransform: proj.transform, 
                        maxPixels: 1e9});
  return feature.set(sampleDict);
};


// Export to Drive
var data_toExport = df.map(sampleDataERA);
Export.table.toDrive(data_toExport, 'WaterQualityAndDiarrhea_MICS_SMDW_sampled', 'WaterQualityAndDiarrhea_MICS_SMDW_sampled');



// Sampling Daily precipitation values-pentads around sample date for subgroup analysis
var sampleDataCHIRPS = function(feature){
  // Get the date of sampling; if needed
  var yearOfSampling = feature.getNumber('HH5Y');
  var monthOfSampling = feature.getNumber('HH5M');
  var dayOfSampling = feature.getNumber('HH5D');
  var dateOfSampling = ee.Date.fromYMD(yearOfSampling, monthOfSampling, dayOfSampling);
  var datePriorYear = dateOfSampling.advance(-365,'days');
  var datePrior14 = dateOfSampling.advance(-14,'days');
  
  var datePrior5 = dateOfSampling.advance(-5,'days');
  var datePrior10 = dateOfSampling.advance(-10,'days');
  var datePrior15 = dateOfSampling.advance(-15,'days');
  var datePrior20 = dateOfSampling.advance(-20,'days');
  var datePrior25 = dateOfSampling.advance(-25,'days');
  var datePrior30 = dateOfSampling.advance(-30,'days');
  var datePrior35 = dateOfSampling.advance(-35,'days');
  var datePrior40 = dateOfSampling.advance(-40,'days');
  var datePrior45 = dateOfSampling.advance(-45,'days');
  var datePrior50 = dateOfSampling.advance(-50,'days');
  var datePrior55 = dateOfSampling.advance(-55,'days');
  var datePrior60 = dateOfSampling.advance(-60,'days');
  var dateAfter5 = dateOfSampling.advance(+5,'days');
  var dateAfter10 = dateOfSampling.advance(+10,'days');
  var dateAfter15 = dateOfSampling.advance(+15,'days');
  var dateAfter20 = dateOfSampling.advance(+20,'days');
  var dateAfter25 = dateOfSampling.advance(+25,'days');
  var dateAfter30 = dateOfSampling.advance(+30,'days');
  var dateAfter35 = dateOfSampling.advance(+35,'days');
  var dateAfter40 = dateOfSampling.advance(+40,'days');
  var dateAfter45 = dateOfSampling.advance(+45,'days');
  var dateAfter50 = dateOfSampling.advance(+50,'days');
  var dateAfter55 = dateOfSampling.advance(+55,'days');
  var dateAfter60 = dateOfSampling.advance(+60,'days');
  var datePrior305 = dateOfSampling.advance(-305,'days');
  
  // !! Make a composite image of the images for CHIRPS
  var bands = ['precipitation'
              ];
  var CHIRPS = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").select(bands);
  var proj = CHIRPS.first().projection().getInfo();
  var meanPriorYear = CHIRPS.filterDate(datePriorYear, dateOfSampling.advance(1, 'day')).mean().rename(addSuffix(bands, '_meanYearPrior'));
  var sumPriorYear_2mShift = CHIRPS.filterDate(datePrior305, dateAfter60.advance(1, 'day')).sum().rename(addSuffix(bands, '_sumYearPrior_2mShift'));
  var sumPriorYear = CHIRPS.filterDate(datePriorYear, dateOfSampling.advance(1, 'day')).sum().rename(addSuffix(bands, '_sumYearPrior'));
  var meanPrior30 = CHIRPS.filterDate(datePrior30, dateOfSampling.advance(1, 'day')).mean().rename(addSuffix(bands, '_mean30daysPrior'));
  var meanPrior14 = CHIRPS.filterDate(datePrior14, dateOfSampling.advance(1, 'day')).mean().rename(addSuffix(bands, '_mean14daysPrior'));
  var sumPrior5 = CHIRPS.filterDate(datePrior5, dateOfSampling.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum5daysPrior'));
  var sumPrior10 = CHIRPS.filterDate(datePrior10, datePrior5.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum10daysPrior'));
  var sumPrior15 = CHIRPS.filterDate(datePrior15, datePrior10.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum15daysPrior'));
  var sumPrior20 = CHIRPS.filterDate(datePrior20, datePrior15.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum20daysPrior'));
  var sumPrior25 = CHIRPS.filterDate(datePrior25, datePrior20.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum25daysPrior'));
  var sumPrior30 = CHIRPS.filterDate(datePrior30, datePrior25.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum30daysPrior'));
  var sumPrior35 = CHIRPS.filterDate(datePrior35, datePrior30.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum35daysPrior'));
  var sumPrior40 = CHIRPS.filterDate(datePrior40, datePrior35.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum40daysPrior'));
  var sumPrior45 = CHIRPS.filterDate(datePrior45, datePrior40.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum45daysPrior'));
  var sumPrior50 = CHIRPS.filterDate(datePrior50, datePrior45.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum50daysPrior'));
  var sumPrior55 = CHIRPS.filterDate(datePrior55, datePrior50.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum55daysPrior'));
  var sumPrior60 = CHIRPS.filterDate(datePrior60, datePrior55.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum60daysPrior'));
  var sumAfter5 = CHIRPS.filterDate(dateOfSampling, dateAfter5.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum5daysAfter'));
  var sumAfter10 = CHIRPS.filterDate(dateAfter5, dateAfter10.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum10daysAfter'));
  var sumAfter15 = CHIRPS.filterDate(dateAfter10, dateAfter15.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum15daysAfter'));
  var sumAfter20 = CHIRPS.filterDate(dateAfter15, dateAfter20.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum20daysAfter'));
  var sumAfter25 = CHIRPS.filterDate(dateAfter20, dateAfter25.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum25daysAfter'));
  var sumAfter30 = CHIRPS.filterDate(dateAfter25, dateAfter30.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum30daysAfter'));
  var sumAfter35 = CHIRPS.filterDate(dateAfter30, dateAfter35.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum35daysAfter'));
  var sumAfter40 = CHIRPS.filterDate(dateAfter35, dateAfter40.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum40daysAfter'));
  var sumAfter45 = CHIRPS.filterDate(dateAfter40, dateAfter45.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum45daysAfter'));
  var sumAfter50 = CHIRPS.filterDate(dateAfter45, dateAfter50.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum50daysAfter'));
  var sumAfter55 = CHIRPS.filterDate(dateAfter50, dateAfter55.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum55daysAfter'));
  var sumAfter60 = CHIRPS.filterDate(dateAfter55, dateAfter60.advance(1, 'day')).sum().rename(addSuffix(bands, '_sum60daysAfter'));
  
  var imageToSample = ee.Image.cat([meanPriorYear, sumPriorYear_2mShift, sumPriorYear, meanPrior30, meanPrior14,
  sumPrior5, sumPrior10, sumPrior15, sumPrior20, sumPrior25, sumPrior30, sumPrior35, sumPrior40,sumPrior45, sumPrior50, sumPrior55, 
  sumPrior60, sumAfter5, sumAfter10, sumAfter15, sumAfter20, sumAfter25, sumAfter30, sumAfter35, sumAfter40,sumAfter45, sumAfter50, sumAfter55, 
  sumAfter60
  ]);
    
  // Get the geometry of the feature
  var hh7 = feature.getString('HH7');
  var geo = GADM_toSample.filter(ee.Filter.eq('HH7',hh7));
    
  // Sample the image
  var reducers = ee.Reducer.mean().setOutputs([bands[0] + '_meanYearPrior'])
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sumYearPrior_2mShift']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sumYearPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_mean30daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_mean14daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum5daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum10daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum15daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum20daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum25daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum30daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum35daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum40daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum45daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum50daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum55daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum60daysPrior']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum5daysAfter']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum10daysAfter']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum15daysAfter']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum20daysAfter']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum25daysAfter']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum30daysAfter']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum35daysAfter']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum40daysAfter']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum45daysAfter']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum50daysAfter']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum55daysAfter']))
        .combine(ee.Reducer.mean().setOutputs([bands[0] + '_sum60daysAfter']))
        
        
        
  var sampleDict = imageToSample.reduceRegion({
                        reducer: reducers, 
                        geometry: geo.geometry(), 
                        // scale: 2000, 
                        crs: proj.crs, 
                        crsTransform: proj.transform, 
                        maxPixels: 1e9});
  return feature.set(sampleDict);
};


// Export to Drive
var data_toExportCHIRPS = df.map(sampleDataCHIRPS);
Export.table.toDrive(data_toExportCHIRPS, 'DailyClimate_MICS_aroundSampleDate', 'DailyClimate_MICS_aroundSampleDate');



