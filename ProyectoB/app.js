firebase.initializeApp({
    apiKey: "AIzaSyCZPg-Fp7jInzNn5IgkknyOeHCjus_mBLI",
    authDomain: "proyectosusuarios-b2c02.firebaseapp.com",
    projectId: "proyectosusuarios-b2c02",
  });
  
     // Initialize Cloud Firestore through Firebase
     var db = firebase.firestore();
    //Agregar documentos
    function guardar(){
        var nombre=document.getElementById('nombre').value
        var apellido=document.getElementById('apellido').value
        var fecha=document.getElementById('fecha').value
        db.collection("users").add({
            first: nombre,
            last: apellido,
            born: fecha
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value='';
            document.getElementById('apellido').value='';
            document.getElementById('fecha').value='';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }