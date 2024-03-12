"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [user, setUser] = useState({ username: "", password: "", email: "" });

  const onLogin = async () => {};
  return (
    <div className="flex flex-col">
      <input
        id="Email"
        type="email"
        placeholder="Email"
        className="border-2"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        id="password"
        type="password"
        placeholder="Password"
        className="border-2"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button onClick={onLogin}>Login</button>
      <Link href={"/signup"}>Visit Signup Page</Link>
    </div>
  );
}
