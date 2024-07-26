import Node from "./Node.mjs";

export default class Grafo {
    #head
    #count
    adjacencyMatrix
    constructor() {
        this.#head = null
        this.#count = 0
        this.adjacencyMatrix = []
    }
    add(value) {
        this.adjacencyMatrix.push(new Array(this.adjacencyMatrix.length + 1).fill(0))
        for (let i = 0; i < this.adjacencyMatrix.length; i++) {
            this.adjacencyMatrix[i].push(0)
        }
        let node = new Node(value)
        if (this.#head == null) {
            this.#head = node
            
        } else {
            let current = this.#head
            while (current.next != null) {
                current = current.next
            }
            current.next = node;
        }
        this.#count++
        return true
    }
    getElementAt(index) {
        if (index >= 0 && index < this.#count) {
            let node = this.#head
            for (let i = 0; i < index && node != null; i++) {
                node = node.next
            }
            return node
        }
        return null
    }
    agregarConexion(inicio, final, distancia) {
        if (inicio >= 0 && inicio < this.adjacencyMatrix.length && final >= 0 && final < this.adjacencyMatrix.length) {
            this.adjacencyMatrix[inicio][final] = distancia
            this.adjacencyMatrix[final][inicio] = distancia
            return true
        }
        return false
    }
    size(){
        return this.#count
    }
    
    busquedaProfundidad(metodo) {
        if(this.adjacencyMatrix.size == 0){
            alert("No hay elementos")
        }
        const visitados = new Array(this.adjacencyMatrix.length).fill(false)
        const pila = [0]
      
        while (pila.length) {
          const indice = pila.pop()
          if (!visitados[indice]) {
            visitados[indice] = true
            const nodo = this.getElementAt(indice)
            metodo(nodo.value)
      
            for (const vecino of this.getVecinos(indice)) {
              if (!visitados[vecino]) {
                pila.push(vecino)
              }
            }
          }
        }
      }
      
      getVecinos(indice) {
        const vecinos = []
        for (let i = 0; i < this.adjacencyMatrix.length; i++) {
          if (this.adjacencyMatrix[indice][i]!== 0) {
            vecinos.push(i)
          }
        }
        return vecinos
      }
}
