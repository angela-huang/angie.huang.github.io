import React, { useEffect, useState } from 'react';
import { ConfigProvider, Row, Col, Card, Image, Carousel, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import axios from 'axios';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import './App.css';
import './typo.css';

import Logo from './images/logo.png';
import Meta from 'antd/lib/card/Meta';
import MultipleEllipsis from './MultipleEllipsis';

const imgList = (data: any) => {
  if (!data) {
    return null;
  }
  const imgSrc = require(`./images/${data}`);
  return imgSrc.default;
};

const processIcons = ['spirulinabreeding', 'algaecultivation', 'rd', 'processing', 'sales'];
const ingredientIcons = ['protein', 'essential', 'carotene', 'ylinolenicacid'];

const App = () => {
  const [data, setData] = useState<any>();
  const [lang, setLang] = useState<string>('cn');
  useEffect(() => {
    setData((window as any).data);
  }, []);

  const menu = () => (<Menu onClick={(e: any) => setLang(e.key)}>
    <Menu.Item key="cn">
      {data?.chinese?.[lang]}
    </Menu.Item>
    <Menu.Item key="en">
      {data?.english?.[lang]}
    </Menu.Item>
  </Menu>);


  return <ConfigProvider locale={lang === 'en' ? { ...enUS, locale: 'en' } : { ...zhCN, 'locale': 'zh' }} autoInsertSpaceInButton={false}>
    <div className="app">
      <div className="banner">
        <div className="clearfix w1440">
          <a className="logo fl" href="/"><img src={Logo} alt="天普乐" /><span className="fs-24">{data?.logo?.[lang]}</span></a>
          <Dropdown overlay={menu} className="fr select-lang">
            <span>
              {
                lang === 'en' ? data?.english?.[lang] : data?.chinese?.[lang]
              }
              <DownOutlined className="ml-xs" />
            </span>
          </Dropdown>
        </div>
        <div className="banner-text w1440">
          <h1>{data?.banner?.title?.[lang]}<span className="border"></span></h1>

          <h3>{data?.banner?.subTitle?.[lang]}</h3>
        </div>
      </div>
      <Row className="process w1440" gutter={0}>
        <Col sm={{ span: 2 }} xs={{ span: 24 }}></Col>
        {
          data?.process?.map((item: any, index: number) => <Col sm={{ span: 4 }} xs={{ span: 24 }} key={index}>
            <div className="process-item">
              <div><div className="icon"><i className={`icon-${processIcons?.[index]}`}></i></div></div>
              <div>{item?.[lang]}</div>
            </div>
          </Col>)
        }
      </Row>
      <div className="card culture bg-gray company-section">
        <div className="w1440">
          <h1>{data?.companyTitle?.[lang]}</h1>
          <div className="culture-list">
            <div className="info">{data?.companyInfo?.[lang]}</div>
            <Carousel autoplay dots={true} className="company-list">
              {
                data?.companyImgNames?.map((item: any) => <div key={item}><img src={imgList(item)} /></div>)
              }
            </Carousel>
          </div>
        </div>
      </div>


      <div className="card pro">
        <div className="w1440">
          <h1>{data?.productTitle?.[lang]}</h1>
          <Row className="pro-list" gutter={60}>
            {
              data?.productLists?.map((item: any, index: number) => <Col key={index} lg={{ span: 8 }} xs={{ span: 24 }}>
                <Card
                  bordered={false}
                  cover={<img alt="example" height={342} src={imgList(item.imgName)} />}
                >
                  <Meta title={<div className="fs-24">{item?.title?.[lang]}</div>} description={<div className="fs-18">{item?.info?.[lang]}</div>} />
                </Card>
              </Col>)
            }

          </Row>
        </div>
      </div>

      <div className="ingredient">
        <div className="w1440">
          <h1>{data?.partTitle?.[lang]}</h1>
          <Row gutter={[24, 24]}>
            {
              data?.partLists?.map((item: any, index: number) => <Col key={index} lg={{ span: 12 }} sm={{ span: 24 }}>
                <div className="ingredient-item">
                  <div><div className="icon"><i className={`icon-${ingredientIcons[index]}`}></i></div></div>
                  <dl>
                    <dt>{item?.title?.[lang]}</dt>
                    <dd>
                      <MultipleEllipsis height={104}>{item?.info?.[lang]}</MultipleEllipsis>
                    </dd>
                  </dl>
                </div>
              </Col>)
            }
          </Row>
        </div>
      </div>
      <div className="base card">
        <div className="w1440">
          <h1>{data?.baseTitle?.[lang]}</h1>
          <Row className="base-list" gutter={0}>
            {
              data?.baseLists?.map((item: any, index: number) => <Col key={index} md={{ span: 12 }} xs={{ span: 24 }}>
                {
                  index === 0 || index === 1 ?
                    <Row gutter={0}>
                      <Col md={{ span: 12 }} xs={{ span: 24 }}>
                        <img alt="example" width={'100%'} height={317} src={imgList(item.imgName)} />
                      </Col>
                      <Col md={{ span: 12 }} xs={{ span: 24 }}>
                        <dl>
                          <dt>{item?.title?.[lang]}</dt>
                          <dd><MultipleEllipsis height={208}>{item?.info?.[lang]}</MultipleEllipsis></dd>
                        </dl>
                      </Col>
                    </Row> :
                    <Row>
                      <Col md={{ span: 12 }} xs={{ span: 24 }}>
                        <dl>
                          <dt>{item?.title?.[lang]}</dt>
                          <dd><MultipleEllipsis height={208}>{item?.info?.[lang]}</MultipleEllipsis></dd>
                        </dl>
                      </Col>
                      <Col md={{ span: 12 }} xs={{ span: 24 }}>
                        <img alt="example" width={'100%'} height={317} src={imgList(item.imgName)} />
                      </Col>
                    </Row>
                }

              </Col>)
            }

          </Row>
        </div>
      </div>

      <div className="advance card">

        <h1 className="w1440">{data?.advanceTitle?.[lang]}</h1>
        <div className="advance-list">
          <Row className="w1440" gutter={24}>
            {
              data?.advanceLists?.map((item: any, index: number) => <Col className="item" key={index} lg={{ span: 12 }} xs={{ span: 24 }}>
                {
                  index % 2 === 0 ?
                    <div className="figure">
                      <dl>
                        <dt>{item?.title?.[lang]}</dt>
                        <dd><MultipleEllipsis height={104}>{item?.info?.[lang]}</MultipleEllipsis></dd>
                      </dl>
                      <div><div className="img"><img alt="example" width={200} height={200} src={imgList(item.imgName)} /></div></div>
                    </div> :
                    <div className="figure">
                      <div><div className="img"><img alt="example" width={200} height={200} src={imgList(item.imgName)} /></div></div>
                      <dl>
                        <dt>{item?.title?.[lang]}</dt>
                        <dd><MultipleEllipsis height={104}>{item?.info?.[lang]}</MultipleEllipsis></dd>
                      </dl>

                    </div>
                }

              </Col>)
            }

          </Row>
        </div>
      </div>

      <div className="card culture">
        <div className="w1440">
          <h1>{data?.identificationTitle?.[lang]}</h1>
          <div className="culture-list">
            <div className="info">{data?.identificationInfo?.[lang]}</div>
            <Row className="renzheng-list">
              <Col lg={{ span: 16 }} xs={{ span: 24 }}>

                <Image.PreviewGroup>

                  <Row gutter={[20, 20]}>

                    {
                      data?.identificationImgNames?.map((item: any, index: number) => index !== data?.identificationImgNames?.length - 1 ? <Col key={item} span={8}>
                        <Image
                          width={'100%'}
                          src={imgList(item)}
                        />
                      </Col> : null)
                    }
                  </Row>
                </Image.PreviewGroup>

              </Col>
              <Col lg={{ span: 8 }} xs={{ span: 24 }} className="text-center">
                <img alt="example" height={436} src={imgList(data?.identificationImgNames?.[data?.identificationImgNames?.length - 1])} />
              </Col>
            </Row>

          </div>
        </div>
      </div>

      <div className="card culture bg-gray">
        <div className="w1440">
          <h1>{data?.cultureTitle?.[lang]}</h1>
          <div className="culture-list">
            <div className="info">{data?.cultureInfo?.[lang]}</div>
            <Image.PreviewGroup>
              <Row gutter={[20, 20]}>
                {data?.cultureImgNames?.map((item: any) => <Col key={item} span={6}>
                  <Image
                    width={'100%'}
                    src={imgList(item)}
                  />
                </Col>)}

              </Row>
            </Image.PreviewGroup>
          </div>
        </div>
      </div>
      <div className="contact">


        <Row className="w1440" gutter={45}>
          <Col lg={{ span: 6 }} xs={{ span: 24 }}>
            <dl>
              <dt>{data?.contact?.title?.[lang]}</dt>
              <dd>{data?.contact?.wechat?.[lang]}</dd>
              <dd>{data?.contact?.emailTitle?.[lang]}
                <a href={`mailto:${data?.contact?.email}`}>{data?.contact?.email}</a>
              </dd>
              <dd>{data?.contact?.websiteTitle?.[lang]}
                <a href={`//${data?.contact?.website}`}>{data?.contact?.website}</a>
              </dd>
            </dl>
          </Col>
          <Col lg={{ span: 6 }} xs={{ span: 24 }}>
            <dl>
              <dt>{data?.address?.title?.[lang]}</dt>
              <dd>{data?.address?.address?.[lang]}</dd>
              <dd>{data?.telTitle?.[lang]}
                {data?.address?.tel}
              </dd>
              <dd>{data?.faxTitle?.[lang]}
                {data?.address?.fax}
              </dd>
            </dl>
          </Col>
          <Col lg={{ span: 6 }} xs={{ span: 24 }}>
            <dl>
              <dt>{data?.subAddress?.title?.[lang]}</dt>
              <dd>{data?.subAddress?.address?.[lang]}</dd>
              <dd>{data?.telTitle?.[lang]}
                {data?.subAddress?.tel}
              </dd>
              <dd>{data?.faxTitle?.[lang]}
                {data?.subAddress?.fax}
              </dd>
            </dl>
          </Col>
          <Col lg={{ span: 6 }} xs={{ span: 24 }}>
            <dl>
              <dt>{data?.wechat?.[lang]}</dt>
              <dd>
                <img src={imgList('tianpuleweixin.jpg')} alt="天普乐" />
              </dd>
            </dl>
          </Col>
        </Row>
      </div>
      <div className="footer">
        <div className="w1440 clearfix">
          <div className={lang === 'en' ? '' : 'fl'}>{data?.copyright?.[lang]}</div>
          <div className={lang === 'en' ? '' : 'fr'}>{data?.support?.[lang]}</div>
        </div>
      </div>
    </div>
  </ConfigProvider>
};

export default App;
