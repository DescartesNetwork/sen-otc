import { Col, Divider, Row } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import Navigation from './navigation'
import Stat from './stat'
import Filter from './filter'
import OfferList from './offerList'

import { ActionProvider } from 'providers/action.provider'
import { SymbolProvider } from 'providers/symbol.provider'
import { StatusProvider } from 'providers/status.provider'
import { SearchProvider } from 'providers/search.provider'
import { SortProvider } from 'providers/sort.provider'

const Home = () => {
  return (
    <ActionProvider>
      <SymbolProvider>
        <StatusProvider>
          <SearchProvider>
            <SortProvider>
              <MaxWidthLayout>
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <Navigation />
                  </Col>
                  <Col span={24} style={{ marginTop: 12 }}>
                    <Stat />
                  </Col>
                  <Col span={24}>
                    <Divider style={{ margin: 8 }} />
                  </Col>
                  <Col span={24}>
                    <Filter />
                  </Col>
                  <Col span={24} style={{ marginTop: 12 }}>
                    <OfferList />
                  </Col>
                </Row>
              </MaxWidthLayout>
            </SortProvider>
          </SearchProvider>
        </StatusProvider>
      </SymbolProvider>
    </ActionProvider>
  )
}

export default Home
