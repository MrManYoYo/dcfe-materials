<template>
  <div class="search-group-container">
    <h3 class="search-group-title">{{ title }}</h3>

    <!-- 查询表单 -->
    <Form ref="searchForm" :model="searchForm" :rules="formRules" :label-width="100" inline>
      <FormItem label="攻击者IP" prop="attackIP">
        <Input v-model="searchForm.attackIP" placeholder="请输入攻击源IP" />
      </FormItem>
      <FormItem label="状态" prop="state">
        <Select v-model="searchForm.state" transfer>
          <Option v-for="item in stateList" :key="item.value" :value="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="威胁类型" prop="threatType">
        <Cascader :data="threatTypeList" change-on-select transfer></Cascader>
      </FormItem>
      <br />
      <FormItem label="时间范围">
        <Row>
          <Col span="12">
            <FormItem label="" prop="startTime">
              <DatePicker :value="searchForm.startTime" transferformat="yyyy年MM月dd日"
                type="date" class="search-form-datepicker" placeholder="请选择开始时间" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="" prop="endTime">
              <DatePicker :value="searchForm.endTime" transfer format="yyyy年MM月dd日"
                type="date" class="search-form-datepicker" placeholder="请选择结束时间" />
            </FormItem>
          </Col>
        </Row>
      </FormItem>
    </Form>

    <!-- 按钮区 -->
    <div class="search-group-bottom">
      <Button type="primary" ghost class="search-group-btn">查询</Button>
      <Button type="error" ghost class="search-group-btn">重置</Button>
    </div>
  </div>
</template>

<script>
const ipRegexp = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
export default {
  name: 'SearchGroup',
  props: {
    title: {
      type: String,
      default: '条件查询'
    }
  },
  data() {
    return {
      searchForm: {
        attackIP: '',
        state: 0,
        threatType: [],
        startTime: '',
        endTime: ''
      },
      formRules: {
        attackIP: [
          { validator: (rule, value, cb) => {
            if (!value) {
              cb()
              return
            }
            // IP 校验
            if (value && !ipRegexp.test(value)) {
              cb(new Error('请输入合法IP'))
            }
            cb()
          }, trigger: 'blur' }
        ],
        state: [
          { type: 'number' }
        ],
        threatType: [
          { type: 'array' }
        ]
      },
      stateList: [],
      threatTypeList: []
    }
  },

  created() {},

  methods: {}
}

</script>

<style scoped>
  .search-group-container {
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 1px 3px 0px rgba(38, 38, 38, 0.1);
    padding: 16px;
    margin-bottom: 16px;
    overflow: hidden;
  }
  .search-group-title{
    position: relative;
    color: #262626;
    font-size: 16px;
    font-weight: normal;
    line-height: 24px;
    margin-bottom: 16px;
  }
  .search-group-title::before{
    content: '';
    position: absolute;
    left: -16px;
    top: 4px;
    width: 4px;
    height: 16px;
    background: #ff6a00;
  }
  .search-group-bottom{
    padding-left: 100px;
  }
  .search-group-btn{
    margin-right: 16px;
  }
  .search-form-datepicker{
    width: 150px;
  }
</style>
