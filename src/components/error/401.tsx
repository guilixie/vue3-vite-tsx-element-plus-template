import img from '@/assets/401.gif'
import { defineComponent } from 'vue'
import styles from './styles/index.module.scss'

export default defineComponent({
  name: '401',
  setup() {
    window.document.title = '401'
    return () => (
      <div class={styles.errContainer}>
        <div class={styles.errWrap}>
          <div class={styles.picContainer}>
            <div class={styles.pic401}>
              <img
                src={`${img}?${new Date()}`}
                width="313"
                height="428"
                alt="Girl has dropped her ice cream."
              />
            </div>
          </div>
          <div class={styles.bullshit}>
            <div class={styles.bullshitOops}>401 错误</div>
            <div class={styles.bullshitHeadline}>
              管理员说你没有权限去该页面...
            </div>
            <div class={styles.bullshitInfo}>
              如果你有任何疑问和不满，建议请联系管理员，你也可以返回首页。
            </div>
            <a href="/" class={styles.bullshitReturnHome}>回到首页</a>
          </div>
        </div>
      </div>
    )
  },
})
