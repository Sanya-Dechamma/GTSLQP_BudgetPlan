
<script>
  import { authHandlers } from "../store/store";

  
      let email = "";
      let password = "";
      let confirmPass = "";
      let error = false;
      let register = false;
      let authenticating = false;
  
      async function handleAuthenticate() {
        if (authenticating) {
            return;
        }
       
          if(!email || !password || (register && !confirmPass) ) {
              error = true;
              return; 
          }
          authenticating = true;

          try {
            if(!register) {
            authHandlers.login(email, password);
          } else {
            await authHandlers.signup(email, password);
          }
          } catch (err) {
              console.log("Apologies, error", err);
              error = true;
          }       
      }
  
      function handleRegister() {
          register = !register;
      }
  </script>
  
  <div class="authContainer">
      <form>
          <h1>{register ? "Register" : "Login"}</h1>
          {#if error}
          <p class="error">The information entered is incorrect</p>
          {/if} 
          <label>
              <p class={email ? " above" : " center"}>Email</p>
              <input bind:value={email} type="email"  placeholder="Email" required/>
          </label>
  
          <label>
              <p class={password ? " above" : " center"}>Password</p>
              <input bind:value={password} type="password"  placeholder="Password" required/>
          </label>
  
          {#if register}
          <label>
              <p class={confirmPass ? " above" : " center"}>Confirm Password</p>
              <input bind:value={confirmPass} type="password"  placeholder="Confirm Password" required/>
          </label>
          {/if}
  
          
          <button on:click={handleAuthenticate} type="button" class="submitbtn">
            {#if authenticating}
            <i class="fa-solid fa-gear spin"></i>
            {:else}
            Submit
            {/if}
          
          </button>
      </form>
  
      <div class = "options">
          <p>Or</p>
          {#if register}
          <div>
              <p>Already have an account?</p>
              <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
              <p on:click={handleRegister} on:keydown={() => {}}>Login</p>
          </div>
          {:else}
          <div>
              <p>Don't have an account?</p>
              <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
              <p on:click={handleRegister} on:keydown={() => {}}>Register</p>
          </div>
          {/if}
  
      </div>
  
      
  </div>
  
  <style>
      .authContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 24px;
      }
  
       form {
          display: flex;
          flex-direction: column;
          gap: 17px;
       }
  
       form,
       .options {
          width: 400px;
          max-width: 100%;
          margin: 0 auto;
       }
       form input {
          width:100%;
       }
       
       h1 {
          text-align: center;
          font-size: 4rem;
       }
  
       form input {
          border: none;
          background: transparent;
          color: white;
          font-size: 1rem;
          padding: 20px;
       }
       
       form label {
          position : relative;
          border: 2px solid rgb(4, 31, 48);
          border-radius: 10px;
       }
  
       form input:focus {
          border: none;        
          outline: none;
       }
  
       form button {
          background: rgb(5, 42, 74);
          color: white;
          border: none;
          padding: 15px;
          border-radius: 35px;
          cursor: pointer;
          font-size: 1rem;
          display: grid;
          place-items: center;
       }
       
       .spin {
        animation: spin 2s infinite;
       }

       @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
       }
  
       form button:hover {
          background: rgb(51, 113, 121);
       }
  
       .above,
       .center {
          position: absolute;
          transition: translateY(-50%);
          pointer-events: none;
          color: white;
          border-radius: 4px;
          padding: 0 6px;
          font-size: 0.8rem;
       }
  
       .above {
          top: 0;
          left: 24px;
          background: rgb(5, 42, 74);
          border: 1px solid rgb(22, 53, 107);
          font-size: 0.7rem;
       }
  
       .center {
          top: 50%;
          left: 6px;
          border: 1px solid transparent;
          opacity: 0;
       }
  
       .error {
          color : rgb(58, 6, 6);
          font-size: 0.9rem;
       }
  
       .options {
         padding: 14px, 0;
         overflow: hidden;
         font-size: 0.9rem;
         display: flex;
         position: relative;
         flex-direction: column;
         gap: 4px;
       }
  
      
     
      .options > p {
         position: relative;
         text-align: center;
         width: fit-content;
         margin: 0 auto;
         padding: 0 8px;
       }
     
      .options > p::after,
      .options > p::before {
         position: absolute;
         content: "";
         top: 50%;
         transform: translateY(-50%);
         width: 100vw;
         height: 1.5px;
         background: white;
       }
     
      .options > p::after {
         right: 100%;
       }
     
      .options > p::before {
         left: 100%;
       }
     
      .options div {
         display: flex;
         align-items: center;
         justify-content: center;
         gap: 10px;
       }
     
      .options div p:last-of-type {
         color: rgb(75, 184, 224);
         cursor: pointer;
       }
  
  </style>