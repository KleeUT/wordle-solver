<script lang="ts">
export let word="";
export let color: "blue"|"green" = "blue"
</script>
<style>

span{
  padding:0.1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  text-align: center;
  font-size: 1.5rem;
  border-radius: 0.5rem;
}
.green{
  background-color: lightgreen;
}
.blue{
  background-color: lightblue;
}
</style>

<span class={color}>
  {word}
</span>