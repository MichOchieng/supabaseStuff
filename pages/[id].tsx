import React from 'react'
import { supabase } from "../utils/supabase"

const LessonDetails = ({lesson}:any) => {
console.log({lesson});
    
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
        <h1>{lesson.title}</h1>
        <p>{lesson.desc}</p>
    </div>
  )
}

export const getStaticPaths = async () => {
    const { data: lessons } = await supabase
        .from('lesson')
        .select('id')

    const paths = lessons!.map(({id}) => ({
        params: {
            id: id.toString(),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps = async ({ params: { id } }:any) => {
    const { data: lesson } = await supabase
        .from('lesson')
        .select('*')
        .eq('id',id)
        .single()

    return {
        props: {
            lesson,
        },
    };
}

export default LessonDetails