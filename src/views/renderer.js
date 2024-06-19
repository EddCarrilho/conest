/**
 * Processo de renderização do documento index.html
 */

console.log("Processo de renderização")

console.log(`Electron: ${api.verElectron()}`)
api.hello()

function sobre() {
    api.openAbout()
}