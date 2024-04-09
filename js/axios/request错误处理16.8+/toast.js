import PubSub from "pubsub-js";
export default function toast(type, content){
  PubSub.publish('toast', {type, content});
}