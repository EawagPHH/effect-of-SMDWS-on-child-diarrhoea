# Safely managed drinking water service use and child diarrhoea based on evidence from 24 countries 

This project focussed on estimating the effect of using safely managed drinking water services (SMDWS) on caregiver reported childhood diarrhoea period prevalence over a two-week recall period across 24 low and middle income countries. 

In a secondary analysis, we investigated the effects of four SMDWS criteria on child diarrhoea, including the use of drinking water 1) from an improved source, 2) accessible on premises, 3) available when needed, and 4) free of faecal contamination at the point of collection (based on the absence of E. coli in a 100 ml drinking water sample). Finally, we assess the degree to which climate zone and heavy rainfall following a dry period modify the effect of SMDWS on diarrhoea. 

For all models Directed Acyclic Graphs (DAG) were created using the Dagitty software (v3.1) describing our assumptions on all exposure routes and confounding factors that may influence the causal relationships between SMDWS, its subcomponents and childhood diarrhoeal. The DAGs can be found in the supplemental of the related manuscript (Greenwood et al., 2026). 

## Data

The following data were used in this project:

- ### Multiple Indicator Cluster Survey (MICS) data
  The household survey data to replicate this study can be downloaded from https://mics.unicef.org/. The relevant files needed for      this analysis are the "hh" (household) and "ch" (childhealth) files. We do not have the rights to redistribute this data and so it    is not available in this public repository. To facilitate the use of our code we recommend downloading and selecting the individual   "hh" and "ch" files of the countries listed in our study and saving them as hh_'countryname'.sav in a local folder names              "HH_MICS_training".

- ### Data sources used to sample precipitation and temperature data
  
  - #### CHIRPS Precipitation Daily: Climate Hazards Center InfraRed Precipitation With Station Data (Version 2.0 Final)
  Funk, Chris, Pete Peterson, Martin Landsfeld, Diego Pedreros, James Verdin, Shraddhanand Shukla, Gregory Husak, James Rowland,        Laura Harrison, Andrew Hoell & Joel Michaelsen. "The climate hazards infrared precipitation with stations-a new environmental         record for monitoring extremes". Scientific Data 2, 150066. doi:10.1038/sdata.2015.66 2015.
  
  - #### ERA5-Land Daily Aggregated - ECMWF Climate Reanalysis 
  Muñoz Sabater, J., (2019): ERA5-Land monthly averaged data from 1981 to present. Copernicus Climate Change Service (C3S) Climate      Data Store (CDS), doi:10.24381/cds.68d2bb30

  - ### Global Administrative (GADM) Areas Boundaries- Version 3.6
  GADM data can be downloaded for each individual country from https://gadm.org/old_versions.html.
  
## Getting started

- ### Opening project and installing packages
  First open the project "Modelling_DD.Rproj". Unfortunately, this version of the repository does not use `renv` to manage R package    dependencies. Therefore, after opening the `.Rproj` file, run the code below once to install the package versions used in this project.

> [!NOTE]
> Installing older package versions may depend on your R version and operating system. If you run into trouble try installing newer package versions. These should also work if there have been no major changes to the specific packages since the version we used. 

```r
if (!requireNamespace("remotes", quietly = TRUE)) {
  install.packages("remotes")
}

required_versions <- c(
  "plyr" = "1.8.8",
  "data.table" = "1.14.8",
  "foreign" = "0.8-83",
  "tableone" = "0.13.2",
  "patchwork" = "1.2.0",
  "gt" = "0.10.1",
  "ggstance" = "0.3.6",
  "broom.mixed" = "0.2.9.4",
  "jtools" = "2.2.2",
  "lme4" = "1.1-33",
  "haven" = "2.5.2",
  "margins" = "0.3.26",
  "here" = "1.0.1",
  "gridExtra" = "2.3",
  "rvest" = "1.0.3",
  "tidyverse" = "2.0.0"
)

for (pkg in names(required_versions)) {
  remotes::install_version(
    package = pkg,
    version = required_versions[[pkg]],
    upgrade = "never",
    dependencies = TRUE
  )
}
```

  
- ### Household data preparation
Once you have your project open, packages installed and household surveys downloaded and the "hh" and "ch" saved in a folder locally  you can build your dataframe by going to "Data_cleaning" and running "preparingHouseholdData.Rmd".

- ### Sample precipitation and temperature data
- For the main analysis we sampled total pentad (5 day) precipitation and average temperature of the Earth’s surface over 30 days       prior to the corresponding survey date. Samples were averaged across each corresponding global administrative areas using GADM        version 3.6 data and the web-based code editor in Google Earth Engine (GEE).

- For the secondary subgroup analysis we sampled pentad (5-day) total precipitation for 6 pentads before and two pentads after each   individual survey date in GEE. We also calculated the total precipitation  over a period of 305 days before the sample date and 60 days after in GEE. The code for this is saved as "samplingEnvironmentalData" and can be run in the GEE code editor using the data sets specified above. If you want replicate our study and avoid this step reach out to the corresponding author of the manuscript or to	esther.greenwood@eawag.ch and we can provide the sampled dataframe.
 
- ### Modelling 
The code used for the main analysis is "main_models_final_logbinom.qmd".


