<template>
  <Card class="custom" v-if="steps && steps.length > 0">
    <template #content>
      <Steps :model="steps" :readonly="false">
        <template #item="{ item }">
          <span :class="isDisabled(item) ? 'p-menuitem-link p-disabled' : 'p-menuitem-link'" :tabindex="item.pageIndex">
            <span class="p-steps-number">{{ item.pageIndex + 1 }}</span>
            <span class="p-steps-title">{{ item.label }}</span>
          </span>
        </template>
      </Steps>
    </template>
  </Card>
</template>
<script lang="ts" setup>
const page = usePage()
const steps = useSteps()

const isDisabled = (item: any) => {
  return item.pageIndex !== (page.value.currentStepIndex)
}
</script>
<style lang="scss" scoped>
.p-steps {
  .p-steps-list {
    .p-steps-item {
      .p-menuitem-link {
        .p-steps-number {
          background: #EFF6FF;
          color: #1D4ED8;
        }

        .p-steps-title {
          font-weight: bold;
        }

        &.p-disabled {
          opacity: 1;

          .p-steps-number {
            color: #6c757d;
            background: #ffffff;
          }

          .p-steps-title {
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>