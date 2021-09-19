import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseHeroName, chooseRealName, chooseComics, choosePower } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

import { useGetData } from '../../custom-hooks';

interface HeroFormProps {
    id?:string;
    data?:{}
}

interface HeroState {
    hero_name: string;
    real_name: string;
    comics_appeared_in: string;
    super_power: string;
}

export const HeroForm = (props:HeroFormProps) => {

    const dispatch = useDispatch();
    let { heroData, getData } = useGetData();
    const store = useStore()
    const hero_name = useSelector<HeroState>(state => state.hero_name)
    const real_name = useSelector<HeroState>(state => state.real_name)
    const comics_appeared_in= useSelector<HeroState>(state => state.comics_appeared_in)
    const super_power = useSelector<HeroState>(state => state.super_power)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await server_calls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseHeroName(data.hero_name))
            dispatch(chooseRealName(data.real_name))
            dispatch(chooseComics(data.comics_appeared_in))
            dispatch(choosePower(data.super_power))
            await server_calls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="hero_name">Hero Name</label>
                    <Input {...register('hero_name')} name="hero_name" placeholder='Hero Name' />
                </div>
                <div>
                    <label htmlFor="real_name">Real Name</label>
                    <Input {...register('real_name')} name="real_name" placeholder="Real Name"/>
                </div>
                <div>
                    <label htmlFor="comics_appeared_in">Comics</label>
                    <Input {...register('comics_appeared_in')} name="comics_appeared_in" placeholder="Comics"/>
                </div>
                <div>
                    <label htmlFor="super_power">Super Power</label>
                    <Input {...register('super_power')} name="super_power" placeholder="Super Power"/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                
                <Button type='submit' color='primary' variant='contained'>Submit</Button>
            </form>
        </div>
    )
}