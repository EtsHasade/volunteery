<template>
  <section class="chat-app">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot>
        <h3>Hi! I'm nadav from support team,</h3>
        <h5>how can I make your day a better day or just helping:)</h5>
      </slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script>
export default {
  name: "chat-app",
  data() {
    return {
      msgs: [],
    };
  },
  methods: {
    closeChat() {
      this.$emit('closeChat')
    },
  },
  mounted() {
    document.body.addEventListener("keyup", (ev) => {
      if (ev.code === "Escape") {
        this.closeChat();
      }
    });
  },
  destroyed() {
    document.body.removeEventListener("keyup", (ev) => {
      if (ev.code === "Escape") {
        this.closeChat();
      }
    });
  }
};
</script>

