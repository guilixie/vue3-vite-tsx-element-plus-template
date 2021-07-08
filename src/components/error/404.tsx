import { defineComponent } from 'vue'
import four from '@/assets/404.png'
import four_cloud from '@/assets/404_cloud.png'
import styles from './styles/index.module.scss'

export default defineComponent({
  name: '404',
  setup() {
    window.document.title = '404'
    return () => (
      <div class={styles.errContainer}>
        <div class={styles.errWrap}>
          <div class={styles.picContainer}>
            <img class={styles.pic404Parent} src={four} alt="404" />
            <img class={`${styles.pic404Child} ${styles.left}`} src={four_cloud} alt="404" />
            <img class={`${styles.pic404Child} ${styles.mid}`} src={four_cloud} alt="404" />
            <img class={`${styles.pic404Child} ${styles.right}`} src={four_cloud} alt="404" />
          </div>
          <div class={styles.bullshit}>
            <div class={styles.bullshitOops}>404 错误</div>
            <div class={styles.bullshitHeadline}>
              管理员说找不着这个页面...
            </div>
            <div class={styles.bullshitInfo}>
              建议擦亮你的双眼，确认输入地址是否正确，你也可以返回首页。
            </div>
            <a href="/" class={styles.bullshitReturnHome}>回到首页</a>
          </div>
        </div>
      </div>
    )
  },
})