import PropTypes from "prop-types";

function DynamicForm3({ fieldsConfig, selectedPages, formSelections, onPageChange, onOptionChange }) {
  return (
    <ul className="page-list">
      {fieldsConfig.map((pageConfig) => (
        <li key={pageConfig.pageName} className="page-item">
          <label>
            <input
              type="checkbox"
              checked={selectedPages.includes(pageConfig.pageName)}
              onChange={() => onPageChange(pageConfig.pageName)}
            />
            <span className="page-link">{pageConfig.pageLabel}</span>
          </label>

          {selectedPages.includes(pageConfig.pageName) && (
            <ul>
              {pageConfig.options.map((option, index) => (
                <li key={`${pageConfig.pageName}-${option.key}-${index}`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={formSelections[pageConfig.pageName]?.includes(option.key) || false}
                      onChange={() => onOptionChange(pageConfig.pageName, option.key)}
                    />
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

DynamicForm3.propTypes = {
  fieldsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      pageName: PropTypes.string.isRequired,
      pageLabel: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  selectedPages: PropTypes.arrayOf(PropTypes.string).isRequired,
  formSelections: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onOptionChange: PropTypes.func.isRequired,
};

export default DynamicForm3;


