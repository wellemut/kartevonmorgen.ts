import { FC } from 'react'
import { useRouter } from 'next/router'
import { useToggle } from 'ahooks'
import { Button, Badge } from 'antd'
import SearchFilters from './SearchFilters'
import SearchInput from './SearchInput'
import FilterOutlined from '@ant-design/icons/lib/icons/FilterOutlined'
import { isExtraSearchFiltersActivated } from '../utils/router'


const onShowFilters = (toggleShowFilters) => () => (toggleShowFilters())

const SearchControllers: FC = (_props) => {
  const [showFilters, { toggle: toggleShowFilters }] = useToggle('0', '1')

  const router = useRouter()

  return (
    <div>
      {/* todo: make the search component a separate component to prevent unnecessary renders*/}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <SearchInput />
        <Badge
          dot={isExtraSearchFiltersActivated(router)}
          offset={[-13, 5]}
        >
          <Button
            type='text'
            icon={
              <FilterOutlined />
            }
            shape='round'
            onClick={onShowFilters(toggleShowFilters)}
            size='small'
          />
        </Badge>
      </div>

      <SearchFilters
        showFilters={showFilters}
      />
    </div>
  )
}

export default SearchControllers
