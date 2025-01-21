<script>
export default {
  data() {
    return {
      isLoading: true, // Состояние прелоадера
    };
  },
  mounted() {
    // Имитируем загрузку
    setTimeout(() => {
      this.isLoading = false; // Убираем прелоадер
    }, 2000); // Прелоадер отображается 2 секунды
  },
};
</script>
<template>
  <div>
    <!-- Прелоадер -->
    <div id="preloader">
      <div class="logo">
        <div class="fruit"></div>
        <span class="text">Abricoz</span>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
body {
  margin: 0;
  overflow: hidden; /* Чтобы убрать прокрутку во время прелоадера */
}

#preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.fruit {
  width: 40px;
  height: 40px;
  border: 5px solid #ff6f00;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.text {
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #ff6f00;
  animation: fadeIn 2s infinite alternate;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
