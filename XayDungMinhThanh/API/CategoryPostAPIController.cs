using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using XayDungMinhThanh.Models;

namespace XayDungMinhThanh.API
{
    public class CategoryPostAPIController : ApiController
    {
        private MinhThanhEntities db = new MinhThanhEntities();

        // GET: api/CategoryPostAPI
        public IQueryable<CategoryPost> GetCategoryPosts()
        {
            return db.CategoryPosts;
        }

        // GET: api/CategoryPostAPI/5
        [ResponseType(typeof(CategoryPost))]
        public IHttpActionResult GetCategoryPost(int id)
        {
            CategoryPost categoryPost = db.CategoryPosts.Find(id);
            if (categoryPost == null)
            {
                return NotFound();
            }

            return Ok(categoryPost);
        }

        //GET: API/CategoryPostAPI?att=...
        public IQueryable<CategoryPost> GetCategoryPost(string att)
        {
            var categoryPost = db.CategoryPosts;

            //Tin tức
            if (att == "tinTuc" && att != null)
            {
                var model = db.CategoryPosts.Where(p => p.id >=15 && p.id<=18);

                return model;
            }

            //Khoa lâm sàng
            if (att == "khoaLamSang" && att != null)
            {
                var model = db.CategoryPosts.Where(p => p.id >= 19 && p.id <= 31);

                return model;
            }

            //Khoa cận lâm sàng
            if (att == "khoaCanLamSang" && att != null)
            {
                var model = db.CategoryPosts.Where(p => p.id >= 32 && p.id <= 35);

                return model;
            }

            //Phòng ban
            if (att == "phongBan" && att != null)
            {
                var model = db.CategoryPosts.Where(p => p.id >= 36 && p.id <= 41);

                return model;
            }

            //Giới thiệu
            if (att == "gioiThieu" && att != null)
            {
                var model = db.CategoryPosts.Where(p => p.id >= 42 && p.id <= 45);

                return model;
            }

            //Danh mục
            if (att == "danhMuc" && att != null)
            {
                var model = db.CategoryPosts.Where(p => p.id >= 46 && p.id <= 52);

                return model;
            }

            return categoryPost;
        }

        // PUT: api/CategoryPostAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCategoryPost(int id, CategoryPost categoryPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != categoryPost.id)
            {
                return BadRequest();
            }

            db.Entry(categoryPost).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryPostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CategoryPostAPI
        [ResponseType(typeof(CategoryPost))]
        public IHttpActionResult PostCategoryPost(CategoryPost categoryPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CategoryPosts.Add(categoryPost);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = categoryPost.id }, categoryPost);
        }

        // DELETE: api/CategoryPostAPI/5
        [ResponseType(typeof(CategoryPost))]
        public IHttpActionResult DeleteCategoryPost(int id)
        {
            CategoryPost categoryPost = db.CategoryPosts.Find(id);
            if (categoryPost == null)
            {
                return NotFound();
            }

            db.CategoryPosts.Remove(categoryPost);
            db.SaveChanges();

            return Ok(categoryPost);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryPostExists(int id)
        {
            return db.CategoryPosts.Count(e => e.id == id) > 0;
        }
    }
}