import { Fragment } from "react";
import { filterOptions } from "../../config";
import { Checkbox, Typography, Paper, Divider, Box } from "@mui/material";

function ProductFilter({ filter, handleFilter }) {
  return (
    <Paper className="product-filter">
      <Box className="filter-header">
        <Typography variant="h6" component="h2" fontWeight="bold">Filters</Typography>
      </Box>
      <Box className="filter-body">
        {
          Object.keys(filterOptions).map((keyItem) => (
            <Fragment key={keyItem}>
              <Box className="filter-section">
                <Typography variant="subtitle1" className="filter-title" fontWeight="bold">{keyItem}</Typography>
                <Box className="filter-options">
                  {
                    filterOptions[keyItem].map((option) => (
                      <label className="filter-option" key={option.label}>
                        <Checkbox
                          size="small"
                          className="filter-checkbox"
                          checked={
                            filter &&
                            Object.keys(filter).length > 0 &&
                            filter[keyItem] &&
                            filter[keyItem].indexOf(option.id) > -1
                          }
                          onChange={() => handleFilter(keyItem, option.id)}
                        />

                        {option.label}
                      </label>
                    ))
                  }
                </Box>
                <Divider className="short-divider" />
              </Box>
            </Fragment>
          ))
        }
      </Box>
    </Paper>
  );
}

export default ProductFilter;
