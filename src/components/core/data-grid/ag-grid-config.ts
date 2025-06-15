import { ModuleRegistry, AllCommunityModule, provideGlobalGridOptions, themeQuartz, themeBalham, themeAlpine } from 'ag-grid-community';

// Register all community modules globally once
ModuleRegistry.registerModules([AllCommunityModule]);



const myTheme = themeQuartz
    .withParams({
        accentColor: "#22E1F2",
        backgroundColor: "#20331D",
        browserColorScheme: "inherit",
        chromeBackgroundColor: "#20331D",
        foregroundColor: "#FFF",
        headerFontSize: 14
    });

// Mark all grids as using legacy themes
provideGlobalGridOptions({
    theme: myTheme,

});


