import React, { useEffect, useCallback } from 'react'
import { IMovieState } from '../redux/reducers/MovieReducer'
import { Table, Switch, Button, message, Popconfirm, Input } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import { IMovie } from '../services/CommonTypes'
import { NavLink } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
export enum SwitchType {
  isHot = "isHot",
  isComing = "isComing",
  isClassic = "isClassic"
}
export interface IPropsEvents {
  onLoad: () => void
  onSwitchChange: (type: SwitchType, newState: boolean, id: string) => void
  onDelete: (id: string) => Promise<void>
  onChange: (newPage: number) => void
  onKeyChange: (newKey: string) => void
  onSearch(): void
}

export default function MovieTable(props: IPropsEvents & IMovieState) {
  const onLoad = useCallback(props.onLoad, []);
  useEffect(() => {
    onLoad();
    return () => {
    }
  }, [onLoad])
  const getColumn = function (): ColumnsType<IMovie> {
    return [
      {
        title: "封面", dataIndex: "poster",
        render(poster: string, i) {
          if (poster) {
            return <img style={{
              width: "50px",
              border: "2px solid #fff"
            }} src={poster} alt="" />
          } else {
            return "暂无图片"
          }
        }
      },
      {
        title: "名称",
        dataIndex: "name",
        filterDropdown(p: object) {
          return (
            <div style={{ padding: 8 }}>
              <Input
                style={{
                  width: 118, marginBottom: 8, display: "blok"
                }}
                value={props.condition.key}
                onChange={e => props.onKeyChange(e.target.value)}
                onPressEnter={props.onSearch}
              ></Input>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 80,
                  marginLeft: 5,
                  marginRight: 8
                }}
                onClick={props.onSearch}
              >
                搜索
            </Button>
              <Button
                size="small"
                style={{
                  width: 80,
                }}
                onClick={() => {
                  props.onKeyChange("");
                  props.onSearch();
                }}
              >
                重置
            </Button>
            </div>
          )
        },
        filterIcon: <SearchOutlined />
      },

      {
        title: "电影类型",
        dataIndex: "types",
        render(text: string[]) {
          return text.join(",")
        }
      },
      {
        title: "地区",
        dataIndex: "areas",
        render(text: string[]) {
          return text.join(",")
        }
      },
      {
        title: "正在热映",
        dataIndex: "isHot",
        render(isHot: boolean, record) {
          return <Switch checked={isHot} onClick={(newVal) => {
            props.onSwitchChange(SwitchType.isHot, newVal, record._id!)
          }}></Switch>
        }
      },
      {
        title: "经典影片",
        dataIndex: "isClassic",
        render(isClassic: boolean, record) {
          return <Switch checked={isClassic} onClick={(newVal) => {
            props.onSwitchChange(SwitchType.isClassic, newVal, record._id!)
          }}></Switch>
        }
      },
      {
        title: "正在进行",
        dataIndex: "isComing",
        render(isComing: boolean, record) {
          return <Switch checked={isComing} onClick={(newVal) => {
            props.onSwitchChange(SwitchType.isComing, newVal, record._id!)
          }}></Switch>
        }
      },
      {
        title: "时长",
        dataIndex: "timeLong",
        render(timeout: string[]) {
          return timeout + "分钟"
        }
      },
      {
        title: "操作",
        dataIndex: "_id",
        render(id: string) {
          return <div>
            <NavLink to={"/movie/edit/" + id}>
              <Button type={"primary"} size={"small"}>编辑</Button>
            </NavLink>
            <Popconfirm
              title={"确认要删除吗？"}
              cancelText="取消"
              okText="确认删除"
              onConfirm={async () => {
                await props.onDelete(id);
                message.success("删除成功", .3);
              }}>
              <Button type={"primary"} danger size={"small"}>删除</Button>
            </Popconfirm>
          </div>
        }
      },
    ]
  }
  function getPageConfig(): TablePaginationConfig | false {
    if (props.total === 0) {
      return false;
    }
    return {
      current: props.condition.page,
      pageSize: props.condition.limit,
      total: props.total,
      hideOnSinglePage: true,
      showSizeChanger: false
    }
  }
  function handleOnChange(pagination: TablePaginationConfig) {
    props.onChange(pagination.current!);
  }
  return (
    <Table rowKey="_id" dataSource={props.data}
      columns={getColumn()}
      pagination={getPageConfig()}
      onChange={handleOnChange}
      loading={props.isLoading}
      size={"middle"}
    >
    </Table>
  )
}
