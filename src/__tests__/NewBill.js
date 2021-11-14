import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import BillsUI from "../views/BillsUI.js"
import firebase from "../__mocks__/firebase.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
    })
  })
})

// test d'intégration POST
describe("Given I am a user connected as Employee", () => {
  describe("When I submit a new bill on NewBill Page", () => {
    test("fetched bills from mock API POST should increase by 1", async () => {
       const postSpy = jest.spyOn(firebase, "post");
       const newBill = {
        id: 'Bufzho88JhduhYgsi7bd',
        name: "testPost",
        email: "a@a",
        type: "Services en ligne",
        vat: "60",
        pct: 10,
        amount: 100,
        status: "pending",
        date: "2021-11-13",
        commentary: "testPost",
        fileName: "testPost.png",
        fileUrl: "https://www.shutterstock.com/fr/image-photo/close-cropped-image-coffee-table-full-1390238210"
       };
       const bills = await firebase.post(newBill);
       expect(postSpy).toHaveBeenCalledTimes(1);
       expect(bills.data.length).toBe(5);
    })
    test("add bills to API and fails with 404 message error", async () => {
      firebase.post.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 404"))
      )
      const html = BillsUI({ error: "Erreur 404" })
      document.body.innerHTML = html
      const message = await screen.getByText(/Erreur 404/)
      expect(message).toBeTruthy()
    })
    test("add messages to API and fails with 500 message error", async () => {
      firebase.post.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 500"))
      )
      const html = BillsUI({ error: "Erreur 500" })
      document.body.innerHTML = html
      const message = await screen.getByText(/Erreur 500/)
      expect(message).toBeTruthy()
    })
  })
})