import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Table, Button, Space, Row, Col, Card,Popconfirm } from 'antd';
import { Spin } from 'antd';
import {
  DeleteOutlined,EditFilled
} from '@ant-design/icons';
import PostModal from './components/PostModal';
import styles from './posts.css';



function Posts({ dispatch, list: dataSource, loading}) {
  
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'Title',
      dataIndex: 'title'
    },
    {
      title: 'Body',
      dataIndex: 'body'
    },
    {
      title: 'Action',
      render: (text, record) => (
        <Space size="middle">
          {/* <Link to={`/edit/${record.id}`}><EditFilled /> </Link>  */}
          <PostModal record={record} onOk={editHandler.bind(null, record.id)} modalTitle = "Edit Post">
              <EditFilled />
            </PostModal>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deletePost.bind(null, record.id)}
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deletePost = (id) => {
    dispatch({
      type: 'posts/remove',
      payload:0
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'posts/create',
      payload: values,
    });
  }
  
  function editHandler(id, values) {
    console.log('0000',id,values)
    dispatch({
      type: 'posts/patch',
      payload: { id, values },
    });
  }

  useEffect(() => {
    dispatch({
      type: 'posts/remove'
    });
  }, [])
 
  return (
    <Row>
      
      { loading && <Spin className={styles.spinner} size="large" /> } 
      <Col span={16} push={4} className={styles.container}>
        <PostModal record={{}} onOk={createHandler} modalTitle = "Create Post">
          <Button size ="large" className = { styles.createBtn} type="primary">Create Post</Button>
        </PostModal>
        <Card title={"List of Posts"} style={{ textAlign: 'center', fontSize: '16px', fontWeight: 600, marginBottom: '60px' }}>
          {
            dataSource.length > 0 ? <Table columns={columns} dataSource={dataSource} rowKey='id' scroll={{ x: 400 }} pagination={{ pageSize: 5 }} bordered />
              : <p style={{ textAlign: 'center' }}> <b>No Data Found.</b></p>
          }
        </Card>
      </Col>
    </Row>
  )

}

function mapStateToProps(state) {
  const { list, total, page } = state.posts;
  return {
    loading: state.loading.models.posts,
    list
  };
}

export default connect(mapStateToProps)(Posts);
