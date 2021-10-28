import { createContext } from 'react'

const Collection = 'collection'
const _Id = '_id'

export function createDefaultViewerContextValue(){
	const get = () => { return {
		_id : localStorage.getItem( _Id ),
		collection : localStorage.getItem( Collection )
	}}
	const set = ({ _id, collection }) => {
		localStorage.setItem( _Id, _id )
		localStorage.setItem( Collection, collection )
	}
	set({ _id : null, collection : null })
	return { get : get, set : set }
}

export const ViewerContext = createContext( createDefaultViewerContextValue() )

export function ViewerContextProvider({ children }){
	
	return <ViewerContext.Provider value = { createDefaultViewerContextValue() }>
		{ children }
	</ViewerContext.Provider>

}
