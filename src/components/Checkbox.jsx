/* eslint-disable react/prop-types */
const Checkbox = ({value, onChange}) => {
  return (
      <input type="checkbox" value={value} onChange={onChange}/>
  )
}

export default Checkbox