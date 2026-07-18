import {
    auth,
    db,
    collection,
    query,
    getDocs
} from "./firebase.js";

auth.onAuthStateChanged(async(user)=>{

    if(!user) return;

    const badge=document.getElementById("notificationBadge");

    if(!badge) return;

    const snapshot=await getDocs(
        query(
            collection(db,"users",user.uid,"notifications")
        )
    );

    let unread=0;

    snapshot.forEach(doc=>{

        if(doc.data().read===false){
            unread++;
        }

    });

    if(unread>0){

        badge.style.display="flex";

        badge.innerHTML=unread;

    }else{

        badge.style.display="none";

    }

});
