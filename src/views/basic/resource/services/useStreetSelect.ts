import type { IData } from '@/app'
import { Ref, ref } from 'vue'

export default function (form: IData) {
  const titles = ['未选街道', '已选街道']

  const data: Ref<IData[]> = ref([])

  const selected: Ref<IData[]> = ref([])

  data.value = [
    {
      id: 1,
      parentId: null,
      label: "杭州市",
      children: [
        {
          id: 2,
          parentId: 1,
          label: "萧山区",
          children: [
            {
              id: 3,
              parentId: 2,
              label: "宁围街道"
            },
            {
              id: 4,
              parentId: 2,
              label: "北干街道"
            }
          ],
        },
        {
          id: 5,
          parentId: 1,
          label: "滨江区",
          children: [
            {
              id: 6,
              parentId: 5,
              label: "长河街道"
            },
            {
              id: 7,
              parentId: 5,
              label: "浦沿街道"
            }
          ],
        }
      ],
    },
    {
      id: 8,
      parentId: null,
      label: "衢州市",
      children: [
        {
          id: 9,
          parentId: 8,
          label: "衢江区",
          children: [
            {
              id: 10,
              parentId: 9,
              label: "樟潭街道",
              children: [
                {
                  id: 14,
                  parentId: 10,
                  label: "高家镇"
                }
              ],
            }
          ],
        },
        {
          id: 11,
          parentId: 8,
          label: "柯城区",
          children: [
            {
              id: 12,
              parentId: 11,
              label: "巨化街道"
            }
          ],
        },
      ],
    },
    { id: 13, parentId: null, label: "丽水市" },
  ]

  return {
    titles,
    data,
    selected
  }
}