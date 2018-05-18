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

    //Leer documento
    var tabla = document.getElementById('tabla');
    db.collection("users").onSnapshot((querySnapshot) => {
        tabla.innerHTML='';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            tabla.innerHTML += `
            <tr>
                <th scope="row">${doc.id}</th>
                <td>${doc.data().first}</td>
                <td>${doc.data().last}</td>
                <td>${doc.data().born}</td>
                <td><button class="btn btn-primary" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
                <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            </tr>
            `
        });
    });

    //Editar Documento
    function editar(id,nombre,apellido,fecha){
        document.getElementById('nombre').value = nombre;
        document.getElementById('apellido').value = apellido;
        document.getElementById('fecha').value = fecha;
        var boton = document.getElementById('boton');

        boton.innerHTML = 'Actualizar';

        boton.onclick = ()=>{
            var washingtonRef = db.collection("users").doc(id); 
            var nombre = document.getElementById('nombre').value;
            var apellido = document.getElementById('apellido').value;
            var fecha = document.getElementById('fecha').value;      

            return washingtonRef.update({
                first: nombre,
                last: apellido,
                born: fecha
            })
            .then(function() {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Guardar';
                document.getElementById('nombre').value='';
                document.getElementById('apellido').value='';
                document.getElementById('fecha').value='';
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
            }
    }

    //Borrar documentos
    function eliminar(id){
        db.collection("users").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }