***************************************************************************************************************************************

Project: FCSAmerica.CentralCodes.Generator
Authors: Bob Walker, Craig Ferraguti
Release Date: 1/11/2017
Description: 
This project is built to generate code based on your application's central codes subscription.  
It is designed to be added to a "Models" type class library through Nuget.  Once you have the nuget installed,
open the CentralCodes.tt file and configure the following variables for your application.

Required Modifications:
At minimum, fill out the ApplicationName property shown below in the CentralCodes.tt file.  The other variables shown below are also
customizable for your application.  Most of these variables will not need to be changed for your implementation.
To use the CodesManager class you will need to implement FCSAmerica.CentralCodes.IMemoryCache in your project.

***************************************************************************************************************************************

This code expects the following AppSettings and Connection String.  It tries to update your app.config to include these properties but
at the time of writing the ECS settings overwrite the transforms built for this application.  Here are the AppSettings so you can copy and paste them
into your app.config


  <connectionStrings>    
    <add name="CentralCodeEntities" connectionString="data source=Test-SQL-CentralCodes;initial catalog=CentralCodes;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework" providerName="System.Data.SqlClient" />    
  </connectionStrings>
  <appSettings>
    <add key="CentralCodesApplicationName" value="-- YOUR APPLICATION NAME HERE --" />
    <add key="CentralCodesAssociationNames" value="" /> <!-- //Include any additional association names.  Add FCMA here if you would like to include the CodesStatic.*_FCMA tables  -->
    <add key="CentralCodesDynamicEnumFilterInclude" value="" /> <!-- Sample Value "^CodesStatic_AGLUnderwritingConditionCategory$|^CodesStatic_DataSource$".  See below -->
    <add key="CentralCodesEnumFilterExclude" value="" />
    <add key="CentralCodesTableFilterInclude" value="" />
    <add key="CentralCodesTableFilterExclude" value="" />
  </appSettings>


// Filtering **************************************************************************************************************************
// Use the following table/view name regex filters to include or exclude tables/views
// Exclude filters are checked first and tables matching filters are removed.
//  * If left null, none are excluded.
//  * If not null, any tables matching the regex are excluded.
// Include filters are checked second.
//  * If left null, all are included.
//  * If not null, only the tables matching the regex are included.
//  Example:    TableFilterExclude = new Regex(".*auto.*");
//              TableFilterInclude = new Regex("(.*_FR_.*)|(data_.*)");
//              TableFilterInclude = new Regex("^table_name1$|^table_name2$|etc");
//              ColumnFilterExclude = new Regex("^FK_.*$");