const RadioGroup = (props: any) => {
  let options: { name: string; id: number }[] = props.options;
  let value: number = props.value;

  function onRadioChanged(e: any) {
    props.onValueChange(e.currentTarget.value);
  }

  return (
    options && (
      <div
        className={`ts-t-radio-group space-x-7 flex ${
          props.labelClassName ? '!gap-6' : ''
        }`}
      >
        {options.map((option, i) => {
          return (
            <span
              key={i + option.name}
              className={`text-sm ${value == option.id ? ' active' : ''}${
                props.className ? ` ${props.className}` : ''
              }`}
            >
              <input
                name={props.radioGroupName}
                type="radio"
                id={option.name.split(' ').join('-')}
                value={option.id}
                checked={value == option.id}
                onChange={onRadioChanged}
              ></input>
              <label
                className={`cursor-pointer  align-text-bottom flex items-center whitespace-nowrap${
                  props.labelClassName ? ` ${props.labelClassName}` : ''
                }`}
                id={'label-' + option.name.split(' ').join('-')}
                htmlFor={option.name.split(' ').join('-')}
              >
                {!props.labelClassName && <span className="mr-2"></span>}
                {option.name}
              </label>
            </span>
          );
        })}
      </div>
    )
  );
};
export default RadioGroup;
