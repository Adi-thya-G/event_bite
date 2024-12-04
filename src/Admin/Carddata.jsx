import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';  // Correct import from ag-grid-react
import { ModuleRegistry } from '@ag-grid-community/core';
import { themeAlpine, themeBalham, themeQuartz } from '@ag-grid-community/theming';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
// Import AG Grid styles (necessary for proper layout and theme)
; // You can use the theme you're working with

// Register AG Grid Modules
ModuleRegistry.registerModules([
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

const themes = [themeQuartz, themeBalham, themeAlpine];

// The main component that renders the grid
const GridExample = () => {
  const [theme, setTheme] = useState(themes[0]); // Set default theme

  return (
    <div style={{ height: '1200px', width:"900px", display: 'flex', flexDirection: 'row' }}>
      <p style={{ flex: 0 }}>
        Theme: <ThemeSelector options={themes} value={theme} setValue={setTheme} />
      </p>
      <div style={{ flex: 1 }}>
        <AgGridReact
          theme={theme} // Apply the selected theme
          loadThemeGoogleFonts={true}
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          sideBar={{ toolPanels: ['filters', 'columns'] }} // Sidebar configuration
        />
      </div>
    </div>
  );
};

// Component for theme selection dropdown
const ThemeSelector = ({ options, value, setValue }) => (
  <select
    onChange={(e) => {
      const selectedTheme = options.find((t) => t?.id === e.currentTarget.value);
      setValue(selectedTheme || options[0]); // Default to first theme if invalid
    }}
    style={{ marginRight: 16 }}
    value={value.id}
  >
    {options.map((option, i) => (
      <option key={i} value={option.id}>
        {option.variant || option.id || '(unchanged)'}
      </option>
    ))}
  </select>
);

// Define row data
const rowData = Array.from({ length: 30 }, (_, i) => {
  return i % 3 === 0
    ? { make: 'Toyota', model: 'Celica', price: 35000 + (i / 3) * 1000 }
    : i % 3 === 1
    ? { make: 'Ford', model: 'Mondeo', price: 32000 + (i / 3) * 1000 }
    : { make: 'Porsche', model: 'Boxster', price: 72000 + (i / 3) * 1000 };
});

// Define column definitions
const columnDefs = [
  { field: 'make' },
  { field: 'model' },
  { field: 'price' },
];

// Define default column definitions (this could be expanded)
const defaultColDef = {
  editable: true,
  flex: 1,
  minWidth: 100,
  filter: true,
};

// Render the component
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <GridExample />
  </StrictMode>
);

export default GridExample;
