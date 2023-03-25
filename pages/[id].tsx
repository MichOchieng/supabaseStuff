import React from 'react'
import { supabase } from "../utils/supabase"

const LessonDetails = () => {
  return (
    <div>LessonDetails</div>
  )
}

export const getStaticPaths = async () => {
    const { data: lessons } = await supabase.from('lesson').select(`id`)

    lessons!.map(({id}) => {
        params: {
            id: id.toString()
        }
    })
}

export const getStaticProps = async () => {
    const { data: lessons } = await supabase.from('lesson').select(`*`)

    lessons!.map(({id}) => {
        params: {
            id: id.toString()
        }
    })
}

export default LessonDetails