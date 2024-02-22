const name = `Rantanplan`
  const animals = [ 
    `dog`,"cat"]


        


export default createBeerBottle({
           drink: ({ url }) => html`
   ${url}

<div>
        <h1>It's a 404!</h1>

  </  div>
                                               ${
                                                                // My eyes bleed
                                                 name +     'dddd'}

                   <span>

                   ${animals.map((e,i)=>html`
                                                <span>
                                                  <div>     ${e} / ${i}   </div>
                                                    </span>
                   `)}
                       </span>



                   <hr />
 `,
});
