

    function vote(msj, id) {
      console.log("a");
      document.getElementById(id).disabled = true;
      const Http = new XMLHttpRequest();
      const url = "/like/" + msj;
      Http.open("POST", url);
      Http.send();
    }

    function unvote(msj, id, id2) {
      document.getElementById(id2).disabled = false;
      const Http = new XMLHttpRequest();
      const url = "/unlike/" + msj;
      Http.open("POST", url);
      Http.send();
    }