import React from "react";
import PropTypes from 'prop-types';

class FilterSection extends React.Component {
    handleChange = (e) => {
        if (typeof this.props.handleCheckboxChange === 'function') {
            this.props.handleCheckboxChange(e.target.checked);
        }
    };

    render() {
        return (
            <div className='onlyVegetarianArea'>
                <input type="checkbox" checked={this.props.onlyVegetarianChecked} onChange={this.handleChange}/>
                <span>tylko wegetarianskie</span>
            </div>);
    }
}

FilterSection.propTypes = {
    handleCheckboxChange: PropTypes.func,
    onlyVegetarianChecked: PropTypes.bool
};
export default FilterSection;