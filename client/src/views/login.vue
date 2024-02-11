<template>
  <header
    class="max-w-1100px h18 ma px3" sm="h13 px6"
    flex="~ justify-between items-center"
  >
    <TheLogo />
    <TheTheme />
  </header>
  <div class="pt18 px3 sm:px6">
    <div class="max-w-300px ma p6 rd-2" bg="white b-gray dark:gray-900">
      <h2 class="mt0 font-size-5">登录</h2>
      <form autocomplete="off">
        <div my3>
          <label for="account" class="inline-block my2">账号</label>
          <input id="account" type="text" class="x-input" placeholder="账号">
        </div>
        <div my3>
          <label for="password" class="inline-block my2">密码</label>
          <input id="password" type="text" class="x-input" placeholder="密码">
        </div>
      </form>
      <div class="my3 text-right">
        <button class="x-btn">login</button>
      </div>
    </div>
  </div>
</template>
