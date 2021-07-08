import type { IData } from '@/app'
import { defineComponent, watch, SetupContext, EmitsOptions, PropType } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import styles from './styles/index.module.scss'

let index = 0
export default defineComponent({
  name: 'AMap',
  props: {
    address: String,
    coords: {
      type: Array as PropType<string[]>,
      default: (): string[] => ['120.121281', '30.222718'] // 经纬度坐标
    }
  },
  emits: ['updateCoords'],
  setup(props: Readonly<IData>, ctx: SetupContext<EmitsOptions>) {
    const amapId: string = `a-map-${index++}`
    const tipInput: string = `tip-input-${index}`

    AMapLoader.load({
      key: 'a133dadf8f8f7118718187b31bce0528',                 // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0',                                          // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        'AMap.Geolocation',
        'AMap.AutoComplete',
        'AMap.PlaceSearch'
      ],                                                       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      // AMapUI: {                                             // 是否加载 AMapUI，缺省不加载
      //   version: '1.1',                                     // AMapUI 缺省 1.1
      //   plugins: [],                                        // 需要加载的 AMapUI ui插件
      // },                                
      // Loca:{                                                // 是否加载 Loca， 缺省不加载
      //   version: '1.3.2'                                    // Loca 版本，缺省 1.3.2
      // },
    }).then((AMap) => {
      const map = new AMap.Map(amapId, {
        zoom: 13,                //初始地图级别
        center: props.coords,    //初始地图中心点
        showIndoorMap: false     //关闭室内地图
      })

      let marker: any
      // 实例化点标记
      function addMarker() {
        marker = new AMap.Marker({
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          position: props.coords,
          offset: new AMap.Pixel(-13, -30)
        })
        marker.setMap(map)
      }

      // 清除 marker
      function clearMarker() {
        if (marker) {
          marker.setMap(null)
          marker = null
        }
      }

      addMarker()

      // 自动提示搜索
      const autoComplete = new AMap.AutoComplete({
        input: tipInput
      })
      // 构造地点查询类
      const placeSearch = new AMap.PlaceSearch({
        map
      })
      // 注册监听，当选中某条记录时会触发
      autoComplete.on('select', (e: IData) => {
        placeSearch.setCity(e.poi.adcode)
        placeSearch.search(e.poi.name)   // 关键字查询查询
      })

      // 定位工具
      const geolocation = new AMap.Geolocation()
      map.addControl(geolocation)

      //为地图注册click事件获取鼠标点击出的经纬度坐标
      map.on('click', (e: IData) => {
        ctx.emit('updateCoords', [e.lnglat.getLng(), e.lnglat.getLat()])
      })

      console.log(AMap, map)

      // 监听属性变化，需要根据监控地址、经纬度（优先级高）切换地图
      watch(props, () => {
        console.log('props')
        if (!props.coords || !props.coords.length) {
          placeSearch.search(props.address)
        } else {
          clearMarker()
          addMarker()
        }
      }, {
        deep: true
      })

    }).catch(e => {
      console.log(e)
    })

    return () => <div class={styles.aMapContainer}>
      <div class={styles.aMap} id={amapId}></div>
      <div class={styles.aMapSearchContainer}>
        <div class="el-input el-input--small el-input-group el-input-group--append">
          <input class="el-input__inner" id={tipInput} type="text" autocomplete="off" placeholder="请输入地址" />
          <div class="el-input-group__append">
            <button class="el-button el-button--default el-button--small" type="button">
              <span>搜索</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  }
})