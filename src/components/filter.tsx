import React from 'react';

export const FilterComponent = ({ filterText, onFilter, onClear, placeholder = '' }:
  { filterText: string, onFilter: any, onClear: any, placeholder?: string }) => (
    <>
      <div className="row">
        <div className="col float-right">
          <div className="input-group">
            <input type="text"
              className="form-control"
              placeholder={placeholder}
              aria-label={placeholder}
              aria-describedby="button-addon2"
              value={filterText}
              onChange={onFilter}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={onClear}>x</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

