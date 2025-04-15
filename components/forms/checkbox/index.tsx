
const Checkbox = (props: any) => {
    const onChange = (event:any)=>{
        const value = event.target.checked;
        const id = props.id;
        props.onChange && props.onChange(id,value);
    }
    function id(index:any){
        if(Number.isInteger(index)) {
            var idMapper = new Map();
            idMapper.set(0, "zero-stop");
            idMapper.set(1, "one-stop");
            idMapper.set(2, "two-stops");
            idMapper.set(3, "three-stops");
            idMapper.set(4, "four-stops");
            idMapper.set(5, "five-stops");
            return idMapper.get(index);
        }
        else{
            return index;
        }
    }

    return (
    <div className={`flex justify-between py-1.5 text-secondary ${props.className&& ` ${props.className}`}`}>
      <div className="flex items-center">
        <input type="checkbox" id={id(props.id)} name={props.label} onChange={onChange} value={props.id} checked={props.checked} className="peer w-4 h-4 accent-primary border-primary cursor-pointer" />
        <label className="pl-2 inline-block peer-checked:text-primary cursor-pointer" htmlFor={props.id}>{ props.label} </label>
      </div>
      { props.price ? <span className="peer-checked:text-primary">$ {props.price}</span> : ''}
    </div>
  )
}

export default Checkbox;