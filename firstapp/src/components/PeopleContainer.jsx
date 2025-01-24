import React from 'react'
import Card from './Card'

export default function PeopleContainer() {
    return (

        <div >
            <h1>People</h1>
            <div className='w-40'>
                <Card name="hans" title="ceo" imageUri="https://picsum.photos/200/300" />
                <Card name="hans" title="ceo" imageUri="https://picsum.photos/200/300" />
                <Card name="hans" title="ceo" imageUri="https://picsum.photos/200/300" />
            </div>
        </div>

    )
}