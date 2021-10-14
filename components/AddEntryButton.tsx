import { CSSProperties, FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import produce from 'immer'
import { convertQueryParamToArray } from '../utils/utils'
import { createSlugPathFromQueryAndRemoveSlug, getRootSlugActionFromQuery } from '../utils/slug'
import { BriefRootSlugEntity, RootSlugEntity, SlugVerb } from '../utils/types'


const onAddEntity = (router: NextRouter) => () => {
  const { query } = router

  // be sure the state is not in the edit or create mode
  const slugAction = getRootSlugActionFromQuery(query)
  if (slugAction.entity !== RootSlugEntity.RESULT || slugAction.subSlugAction !== null) {
    return
  }

  const newQueryParams = produce(query, draftState => {
    const { slug } = query
    const slugArray = convertQueryParamToArray(slug)
    slugArray.push(BriefRootSlugEntity.ENTRIES, SlugVerb.CREATE)

    delete draftState.sidebar
    draftState.slug = slugArray
  })

  const [newPath, newQueryWithoutSlug] = createSlugPathFromQueryAndRemoveSlug(newQueryParams)

  router.replace(
    {
      pathname: `/m/${newPath}`,
      query: newQueryWithoutSlug,
    },
    undefined,
    { shallow: true },
  )
}


interface AddEntryButtonProps {
  style?: CSSProperties
}


const AddEntryButton: FC<AddEntryButtonProps> = (props) => {
  const router = useRouter()

  const { style } = props

  return (
    <Button
      size="middle"
      icon={
        <PlusCircleOutlined
          style={{
            marginRight: 4,
          }}
        />
      }
      onClick={onAddEntity(router)}
      style={style}
    >
      Add
    </Button>
  )
}

AddEntryButton.defaultProps = {
  style: {
    width: 88,
  },
}

export default AddEntryButton