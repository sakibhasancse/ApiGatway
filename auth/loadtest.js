import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100, // Virtual users
  duration: "30s", // Test duration
};

export default function () {
  let res = http.get("http://localhost:3000/deails/v1/app-users/deals", {
    headers: {
      "x-user-msisdn": `880176355${Math.floor(Math.random() * 9000) + 1000}`,
    },
  }); // Your API
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 200ms": (r) => r.timings.duration < 200,
  });
  sleep(1);
}
