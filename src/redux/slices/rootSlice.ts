import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        hero_name: 'Spider Man',
        real_name: "Peter Parker",
        description: "Orphaned as a toddler, he had to live with his Uncle Ben and Aunt May. During a science exhibition, he was bitten by a Radioactive Spider, granting him his powers.",
        comics_appeared_in: '14374',
        super_power: 'Spider Physiology'
    },
    reducers: {
        chooseHeroName: (state, action) => { state.hero_name = action.payload},
        chooseRealName: (state, action) => { state.real_name = action.payload},
        chooseComics: (state, action) => { state.comics_appeared_in = action.payload},
        choosePower: (state, action) => { state.super_power = action.payload}
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseHeroName, chooseRealName, chooseComics, choosePower  } = rootSlice.actions;