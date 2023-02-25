export const SimpleSelect = (props) => {
    return (
        <select value={props.value} onChange={({ target }) => props.setValue(target.value)}>
            {props.options.map(obj => (
                <option key={obj.value} value={obj.value}>{obj.label}</option>
            ))}
        </select>
    )
}