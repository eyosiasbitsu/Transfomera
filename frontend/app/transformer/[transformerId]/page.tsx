import TransformerDetail from '@/components/TransformerDetail/TransformerDetail';
import React from 'react'

const TransformerDetailPage = ({params} :{params:{transformerId: string}}) => {
  return (
    <TransformerDetail id={params.transformerId} />
  )
}

export default TransformerDetailPage;