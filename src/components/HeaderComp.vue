<template>
  <header class="py-2">
    <div class="container d-flex align-items-center justify-content-between">
      <div class="left-side">
        <h3 class="fw-bold">برمجنا</h3>
        <p class="text-muted">اضف برنامج جديد</p>
      </div>
      <div class="right-side d-flex align-items-center gap-4 flex-md-row flex-column align-items-end">
        <router-link to="/">
          البرامج
        </router-link>
        <router-link to="/add-program">
          اضافه برنامج
        </router-link>
        <router-link to="/services-images">
          صور الخدمات
        </router-link>
        <router-link to="/archive">
          الارشيف
        </router-link>
        <a href="https://seasonreal.seasonsge.com/appv1real/admin/login.php" class="fw-bold">
          الرجوع للصفحه الرئيسية
        </a>
      </div>
    </div>
  </header>
</template>
<script setup>

</script>
<style lang="scss">
  header {
    background-color: var(--white-color);
    .right-side {
      a {
        transition: 0.2s;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          border-radius: 50px;
          background-color: #dc3545;
          height: 2px;
          transition: 0.2s;
        }
        &:hover {
          color: #dc3545;
          &::before {
            width: 100%;
          }
        }
        &.router-link-active {
          color: #dc3545;
          &::before {
            width: 100%;
          }
        }
      }
    }
  }
</style>