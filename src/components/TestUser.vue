<template>
  <div>
    <header>
      <div class="title">
        <h1>使用者清單</h1>
        <div class="control">
          <div class="control-item">
            刷新資料
            <input class="button" type="button" value="刷新資料" @click="getUsers" />
          </div>
          <div class="control-item">
            顯示尺寸
            <input class="button" type="button" value="大" @click="size = 'large'" />
            <input class="button" type="button" value="中" @click="size = 'medium'" />
            <input class="button" type="button" value="小" @click="size = 'small'" />
          </div>
          <div class="control-item">
            <input type="text" v-model="inputSearch" placeholder="根據使用者姓名搜尋" />
            <input class="button" type="button" value="清除" @click="inputSearch = ''" />
          </div>
        </div>
      </div>
    </header>
    <main>
      <table :class="size">
        <thead>
          <tr>
            <th>使用者</th>
            <th>性別年齡</th>
            <th>聯絡電話</th>
            <th>地址</th>
            <th>電子信箱</th>
            <th>註冊日期</th>
          </tr>
        </thead>
        <tbody>
          <tr class="info" v-for="item in userList">
            <td>
              <img v-if="size === 'large'" :src="item.picture.large" alt="" />
              <img v-else-if="size === 'medium'" :src="item.picture.medium" alt="" />
              <img v-else :src="item.picture.thumbnail" alt="" />
              <p>{{ item.name.first + ' ' + item.name.last }}</p>
            </td>
            <td>
              <span v-if="item.gender === 'male'">🙋‍♂️</span>
              <span v-else>🙋‍♀️</span>
              {{ item.dob.age }} 歲
            </td>
            <td>{{ item.phone }}</td>
            <td>{{ item.location.street.number + ' ' + item.location.street.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.registered.date }}</td>
          </tr>
        </tbody>
      </table>
    </main>
    <footer>
      <p>Vue 3 新手夏令營 week1 by 小艾</p>
    </footer>
  </div>
</template>

<script>


export default {
  data() {
    return {
      originUsers: {},
      inputSearch: "",
      size: "small"
    };
  },
  computed: {
    userList() {
      let list = [];
      Object.values(this.originUsers).forEach(
        (item) =>
          (item.name.first.includes(this.inputSearch) ||
            item.name.last.includes(this.inputSearch)) &&
          list.push(item)
      );
      return list;
    }
  },
  methods: {
    getUsers() {
      this.axios.get("https://randomuser.me/api/?results=50").then((res) => {
        this.originUsers = res.data.results;
      });
    }
  },
  mounted() {
    this.getUsers();
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans TC', 'Microsoft JhengHei', sans-serif;
}

header {
  background-color: #0f6db4;
}

footer {
  background-color: #333;
  color: #fff;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.control {
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-item {
  margin: 8px;
}

.small {
  font-size: 1rem;
}

.medium {
  font-size: 1.5rem;
}

.large {
  font-size: 2rem;
}

main {
  display: flex;
  justify-content: center;
}

table {
  border-collapse: collapse;
}

thead {
  background-color: #032f4f;
  color: #fff;
}

td {
  padding: 8px;
  text-align: center;
}

tr:nth-child(2n) {
  background-color: #ddd;
}
</style>
