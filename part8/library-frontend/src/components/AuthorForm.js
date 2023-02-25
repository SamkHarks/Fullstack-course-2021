import { useMutation } from "@apollo/client"
import { CHANGE_BIRTHYEAR, ALL_AUTHORS } from "./queries"
import { useState } from 'react'
import { SimpleSelect } from "./SimpleSelect";
import { useMemo } from "react";

export const AuthorForm = (props) => {
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');

    const [changeBirthyear] = useMutation(CHANGE_BIRTHYEAR, {
        refetchQueries: [ {query: ALL_AUTHORS}  ]
    })

    const onSubmit = async (event) => {
        event.preventDefault()

        changeBirthyear({variables: { name, setBornTo: Number(born) }});

        setName('');
        setBorn('');
    }

    const options = useMemo(()=> {
        console.log('usemememeo')
        return props.authors.reduce((car, val) => {
        return [...car, {value: val.name, label: val.name}]
    }, [])}, [props.authors]);


    return (
        <div>
            <h2>Change birthyear</h2>
            <form onSubmit={onSubmit}>
                <div>
                    Choose author to edit
                    <SimpleSelect value={name} setValue={setName} options={options}/>
                </div>
                <div>
                    born
                    <input
                        type='number'
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>edit author</button>
            </form>
        </div>
    );
}