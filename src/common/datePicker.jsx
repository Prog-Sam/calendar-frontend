import MyDatePicker from 'react-datepicker';

const DatePicker = ({ name, label, error,value, onChange, ...rest }) => {
    return (
      <div>
        <div className='form-group'>
          <div>
            <label className='d-flex align-items-left' htmlFor={name}>
              {label}
            </label>
          </div>
          <div>
            <MyDatePicker
              {...rest}
              id={name}
              selected={value}
              name={name}
              onChange={(d) => onChange({name: name, value: d})}
              className='form-control d-flex align-items-left'
            />
          </div>
          {error && <div className='alert alert-danger'>{error}</div>}
        </div>
      </div>
    );
  };
  
  export default DatePicker;